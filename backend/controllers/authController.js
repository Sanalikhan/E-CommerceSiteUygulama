import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { AuthClient, OAuth2Client } from 'google-auth-library';

const createToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
export const register = async (req, res, next) => {
  try {
    const { email, password, name, username, phone } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!name || !username) {
      return res.status(400).json({ error: 'Name and username are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      email, 
      passwordHash,
      name,
      username,
      phone,
      termsAccepted: true
    });
    const token = createToken(user);

    res.status(201).json({ 
      user: { 
        id: user.id, 
        name: user.name,
        email: user.email, 
        username: user.username,
        phone: user.phone,
        role: user.role 
      }, 
      token 
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.json({ 
      user: { 
        id: user.id, 
        name: user.name,
        email: user.email, 
        username: user.username,
        phone: user.phone,
        role: user.role 
      }, 
      token 
    });
  } catch (error) {
    next(error);
  }
};

export const googleSignIn = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: 'Missing idToken' });
  //console.log("ID Token", idToken);

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const emailVerified = payload.email_verified === true || payload.email_verified === 'true';
    if (!emailVerified) {
      return res.status(401).json({ error: 'Google account email not verified' });
    }

    let user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      // create a safe unique username from email local part
      const base = (payload.email.split('@')[0] || 'user').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 20);
      let username = base || `user${Date.now()}`;
      let exists = await User.findOne({ where: { username } });
      let suffix = 1;
      while (exists) {
        username = `${base}${suffix}`;
        exists = await User.findOne({ where: { username } });
        suffix += 1;
      }

      user = await User.create({
        email: payload.email,
        name: payload.name || null,
        username,
        phone: null,
        passwordHash: null,
        picture: payload.picture || null,
        termsAccepted: true,
      });
    } else {
      // update picture if available
      if (payload.picture && user.picture !== payload.picture) {
        user.picture = payload.picture;
        await user.save();
      }
    }

    const token = createToken(user);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role,
        picture: user.picture || payload.picture || null,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
