import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js';
import { User } from '../models/index.js';

const originalEnv = process.env.JWT_SECRET;
const originalFindByPk = User.findByPk;
process.env.JWT_SECRET = 'test-secret';

test('authMiddleware attaches the current database role to req.user', async () => {
  const user = {
    id: 123,
    email: 'admin-role-check@example.com',
    name: 'Admin Role Check',
    role: 'admin',
  };

  User.findByPk = async (id) => {
    assert.equal(id, user.id);
    return user;
  };

  const token = jwt.sign({ id: user.id, email: user.email, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = {
    status(code) { this.code = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };

  let nextCalled = false;

  await new Promise((resolve) => {
    authMiddleware(req, res, () => {
      nextCalled = true;
      resolve();
    });
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.id, user.id);
  assert.equal(req.user.role, 'admin');
  assert.equal(req.user.email, user.email);

  User.findByPk = originalFindByPk;
  if (originalEnv === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalEnv;
  }
});
