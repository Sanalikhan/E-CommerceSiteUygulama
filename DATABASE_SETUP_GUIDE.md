# Database Setup & Migration Guide

## 📋 Overview

Your e-commerce project has **everything needed** to populate the database automatically. The database setup is well-structured with Sequelize ORM and automatic seeding functionality.

---

## 🗄️ Database Structure

### **5 Main Tables:**

1. **Users** - Customer and admin accounts
   - Fields: id, name, username, email, phone, passwordHash, picture, role, termsAccepted
   - Auto-creates admin account on startup

2. **Products** - Product catalog
   - Fields: id, title, image, priceMin, priceMax, featured, popular
   - Auto-seeds 12 initial products on startup

3. **Orders** - Customer orders
   - Fields: id, userId, totalAmount, status, createdAt
   - Links to Users

4. **OrderItems** - Individual items in orders
   - Fields: id, orderId, productId, quantity, unitPrice
   - Links Orders to Products

5. **ContactMessages** - Contact form submissions
   - Fields: id, name, company, email, phone, message

---

## 🚀 How Database Population Works

### **Automatic Population (Happens Every Time Backend Starts):**

**Location:** `backend/index.js` lines 68-74

```javascript
const startServer = async () => {
  try {
    await sequelize.authenticate();        // Connect to database
    await sequelize.sync({ alter: true }); // Create/update tables
    await seedInitialProducts();           // Auto-seed products
    await ensureDefaultAdmin();            // Auto-create admin
    console.log('Database connected, models synced, and initial products seeded.');
  }
}
```

### **What Happens:**

1. **Database Connection** - Connects to PostgreSQL
2. **Table Creation/Update** - Creates all 5 tables if they don't exist
   - Uses `sequelize.sync({ alter: true })` which updates existing tables
3. **Products Seeding** - Adds 12 products (ONLY if Products table is empty)
4. **Admin Creation** - Creates admin user (ONLY if admin doesn't exist)

---

## 📦 Pre-Loaded Data

### **Products (12 items auto-loaded):**
Located in: `backend/controllers/productController.js` lines 4-101

1. 36" and 48" Wide 5-S Storage Cabinets ($1523.66 - $1544.67)
2. 36" Small Parts Storage and Security Cabinets ($1933.93 - $2180.76)
3. Adjustable Spring Safety Gate ($159.91 - $199.55)
4. All Welded Heavy Duty Gear Lockers ($534.61 - $1172.86)
5. All Welded Heavy Duty Storage Cabinet Lockers ($843.47 - $1178.00)
6. Barriers ($1186.00 - $5611.00)
7. Bollard Cover ($40.95 - $112.95)
8. Bollard Covers ($35.99 - $79.99)
9. Bollards ($93.10 - $267.93)
10. Bolt Down Bollards ($199.95 - $629.95)
11. Bounce Back Bollard ($159.91 - $199.55)
12. Box Lockers ($534.61 - $1172.86)

### **Admin User (auto-created):**
- Email: From `ADMIN_EMAIL` environment variable
- Password: From `ADMIN_PASSWORD` environment variable
- Role: admin
- Username: admin

---

## 🔄 If You Change Databases

### **What You Need:**

✅ **You have EVERYTHING!** No additional setup needed.

When you switch to a new database, just update your environment variables and the backend will automatically:

1. ✅ Create all tables
2. ✅ Seed 12 products
3. ✅ Create admin account

### **Environment Variables Needed:**

```env
# Option 1: Database URL (Recommended for cloud databases)
DATABASE_URL=postgresql://user:password@host:port/database

# Option 2: Individual credentials
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost  # or your host
DB_PORT=5432

# Admin account credentials
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=SecurePassword123!

# JWT for authentication
JWT_SECRET=your-jwt-secret-key

# Optional: Image uploads
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_key
```

### **Steps to Change Database:**

1. **Update environment variables** on your hosting platform (Render, Heroku, etc.)
2. **Redeploy backend** (or it auto-redeploys on Render)
3. **Wait 2-3 minutes** for startup
4. **Done!** ✅ All tables created, products loaded, admin created

---

## 🛠️ Manual Database Control

### **API Endpoints for Manual Seeding:**

If you want to manually seed products (after database is set up):

```bash
# Manual product seeding (requires admin login)
POST /api/products/seed
Authorization: Bearer <admin-jwt-token>

Response: "Products seeded successfully"
```

**Note:** This will ONLY work if Products table is empty. It prevents duplicate seeding.

### **Add New Products:**

```bash
POST /api/products
Authorization: Bearer <admin-jwt-token>
Content-Type: multipart/form-data

Body:
- title: "Product Name"
- image: <file.png>
- priceMin: 100
- priceMax: 200
- featured: true/false
- popular: true/false
```

### **Admin Dashboard:**

Your app has a built-in admin dashboard at `/admin` where admins can:
- ✅ View all products
- ✅ Add new products with images
- ✅ Delete products
- ✅ View orders
- ✅ See sales statistics

---

## 🔍 Database Schema Details

### **Relationships:**

```
Users (1) ----< (Many) Orders
Orders (1) ----< (Many) OrderItems
Products (1) ----< (Many) OrderItems
```

### **Sequelize Configuration:**

**Location:** `backend/config/database.js`

- **Dialect:** PostgreSQL
- **SSL:** Enabled in production
- **Logging:** Disabled in production, enabled in development
- **Sync Mode:** `alter: true` (updates tables without dropping data)

---

## 🎯 Frontend Data Loading

### **How Frontend Gets Products:**

**Location:** `src/features/CatalogSlice.js` lines 65-76

```javascript
export const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async (_, thunkAPI) => {
    const response = await fetch(`${VITE_API_URL}/api/products`);
    return response.json();
  }
);
```

### **Frontend State Includes:**

- **Banner Data** (hardcoded in CatalogSlice)
- **Key Characteristics** (hardcoded)
- **Example Applications** (hardcoded)
- **Products** (fetched from backend API)

---

## ✅ Summary: Do You Have Everything?

### **YES! ✅ You have EVERYTHING needed:**

✅ **Database Models** - All 5 tables defined  
✅ **Auto Table Creation** - Tables created automatically  
✅ **Auto Data Seeding** - 12 products loaded on startup  
✅ **Auto Admin Creation** - Admin user created on startup  
✅ **Manual Seed Option** - API endpoint for manual seeding  
✅ **Admin Dashboard** - UI for managing products  
✅ **Image Upload** - Supabase integration for product images  
✅ **API Endpoints** - Full CRUD operations for products  

### **If You Change Database:**

1. Update `DATABASE_URL` (or individual DB credentials) in environment
2. Update `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Restart backend
4. **Done!** Everything auto-populates

---

## 🚨 Important Notes

### **Data Persistence:**

- **Products:** Seeded ONLY if table is empty (prevents duplicates)
- **Admin:** Created ONLY if admin email doesn't exist
- **Orders/Users:** Created as customers place orders and register

### **Image Storage:**

- **Product Images:** Currently stored as file paths in database
- **Initial Products:** Use local `/images/` folder
- **New Products:** Uploaded to Supabase storage (requires Supabase credentials)

### **Database Sync Mode:**

Current setting: `sequelize.sync({ alter: true })`

- ✅ **Pros:** Updates tables without losing data
- ⚠️ **Note:** For production migrations, consider using Sequelize migrations instead

---

## 📝 Quick Reference

### **Check Database Status:**

```bash
GET /api/status
Response: { ok: true, message: "Backend is running!" }
```

### **Get All Products:**

```bash
GET /api/products
Response: [{ id, title, image, price: { min, max }, featured, popular }]
```

### **Database Tables:**

```
- Users
- Products
- Orders
- OrderItems
- ContactMessages
```

### **Current Product Count:** 12 items  
### **Required Env Variables:** 3 minimum (DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD)  
### **Optional Env Variables:** 2 (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

---

## 🎉 Conclusion

Your project is **production-ready** for database changes. Everything is automated and well-structured. Just update the database connection string, and the backend handles the rest!

**No additional setup needed.** ✅
