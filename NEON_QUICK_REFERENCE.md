# 🚀 Neon Database - Quick Reference

## 📋 Your Database Info

**Project Name:** ecommerce-website  
**Project ID:** crimson-mouse-11851317  
**Region:** AWS US East (aws-us-east-1)  
**Branch:** main  

---

## 🔗 Connection String (Copy This to Render!)

```
postgresql://neondb_owner:npg_irEFnJY0K9jW@ep-polished-term-bcae7d3o.c-16.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## ⚡ Quick Setup for Render

1. **Go to:** Render Dashboard → Your Backend Service → Environment
2. **Add variable:**
   - Key: `DATABASE_URL`
   - Value: (paste connection string above)
3. **Add these too:**
   - `ADMIN_EMAIL=admin@yourdomain.com`
   - `ADMIN_PASSWORD=YourSecurePassword123!`
   - `JWT_SECRET=your-32-char-secret-key-here`
4. **Save** → Wait 2-3 minutes → Done! ✅

---

## 💻 Useful Commands

```bash
# Get connection string
neon connection-string

# View project
neon project show

# Create dev branch
neon branches create --name dev

# List branches
neon branches list

# Run SQL query
neon sql "SELECT * FROM \"Products\";"

# View help
neon --help
```

---

## 🌐 Web Console

**Access:** https://console.neon.tech/  
**Project:** ecommerce-website (crimson-mouse-11851317)

---

## ✅ What Happens Automatically

When backend connects:
1. ✅ Creates 5 tables (Users, Products, Orders, OrderItems, ContactMessages)
2. ✅ Loads 12 products
3. ✅ Creates admin user

---

## 🔍 Test Connection

```bash
# Test backend status
curl https://your-app.onrender.com/api/status

# Get products
curl https://your-app.onrender.com/api/products
```

---

## 📞 Need Help?

- Docs: https://neon.tech/docs
- Discord: https://discord.gg/neon
- Detailed Guide: See `NEON_SETUP_COMPLETE.md`
