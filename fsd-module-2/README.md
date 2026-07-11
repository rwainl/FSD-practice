# Health Products API - Practice Results

## Overview
This project demonstrates the implementation of CRUD operations using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. The application successfully connects to a local MongoDB database and performs all required database operations, including soft delete functionality.

---

## Database Connection

The application successfully connected to the local MongoDB server.

```text
MongoDB Local connected successfully
Database: health-products

Database connected! Starting tests...
```

**Status:** ✅ PASSED

---

# Test Results

## ✅ Test 1 - Database Connection

Verified that the application can establish a connection with the MongoDB database.

**Result:** PASSED

---

## ✅ Test 2 - Create Product

A new product was successfully inserted into the database.

### Sample Result

| Field | Value |
|-------|-------|
| Name | Test Vitamin C |
| Category | Vitamin |
| Price | Rp 75,000 |
| Stock | 30 |
| Manufacturer | PT Aiman |
| Status | Active |

**Result:** PASSED

---

## ✅ Test 3 - Get All Products

Successfully retrieved all products stored in the database.

### Output

- Total Products: **2**
- Successfully returned product data.

**Result:** PASSED

---

## ✅ Test 4 - Get Product by ID

Successfully retrieved a specific product using its MongoDB ObjectId.

### Retrieved Product

- Name: Test Vitamin C
- Category: Vitamin
- Price: Rp 75,000
- Stock: 30

**Result:** PASSED

---

## ✅ Test 5 - Filter Products by Category

Successfully filtered products using the **Vitamin** category.

### Output

| Product | Price |
|----------|--------|
| Test Vitamin C | Rp 75,000 |
| Test Vitamin C | Rp 80,000 |

Total Products Found: **2**

**Result:** PASSED

---

## ✅ Test 6 - Update Product

Successfully updated an existing product.

### Updated Fields

| Field | New Value |
|-------|-----------|
| Price | Rp 80,000 |
| Stock | 25 |

**Result:** PASSED

---

## ✅ Test 7 - Soft Delete Product

Instead of permanently removing the product, the application performs a **soft delete** by changing the `isActive` field to `false`.

### Soft Delete Result

```json
{
  "success": true,
  "message": "Product Deactivated"
}
```

### Verification

```json
{
  "productId": "6a520dea4c7051a92ab15eef",
  "isActive": false
}
```

**Result:** PASSED

---

# Test Summary

| Test | Description | Status |
|------|-------------|--------|
| Test 1 | Database Connection | ✅ PASSED |
| Test 2 | Create Product | ✅ PASSED |
| Test 3 | Get All Products | ✅ PASSED |
| Test 4 | Get Product by ID | ✅ PASSED |
| Test 5 | Filter Products by Category | ✅ PASSED |
| Test 6 | Update Product | ✅ PASSED |
| Test 7 | Soft Delete Product | ✅ PASSED |

---

# Overall Result

All required features have been successfully implemented and tested.

- ✅ MongoDB connection established successfully
- ✅ Create product
- ✅ Retrieve all products
- ✅ Retrieve product by ID
- ✅ Filter products by category
- ✅ Update product
- ✅ Soft delete using `isActive`
- ✅ All automated tests passed

**Final Status:** 🎉 **TEST 1–7 PASSED**