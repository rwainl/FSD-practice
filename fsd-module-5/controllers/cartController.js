/**
 * Cart Controller
 *
 * TODO untuk peserta:
 * 1. Import User dan Product models
 * 2. Implement getCart:
 *    - Get user dari req.user
 *    - Initialize cart jika null
 *    - Populate product details
 *    - Return cart
 *
 * 3. Implement addToCart:
 *    - Get user dan productId dari request
 *    - Find product
 *    - Initialize cart jika null
 *    - Check if product already in cart
 *    - Add or update quantity
 *    - Save user
 *    - Return updated cart
 *
 * 4. Implement updateCartItem:
 *    - Get user dan productId
 *    - Find item in cart
 *    - Update quantity
 *    - Save user
 *    - Return updated cart
 *
 * 5. Implement removeFromCart:
 *    - Get user dan productId
 *    - Remove item from cart
 *    - Save user
 *    - Return updated cart
 *
 * Reference: ../finished-project/controllers/cartController.js
 */

const User = require("../models/User");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "cart.product",
      select: "name price category stock imageUrl manufacturer isActive",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.cart) {
      user.cart = [];
      await user.save();
    }

    const validCart = user.cart.filter(
      (item) => item.product && item.product.isActive,
    );

    const cartTotal = validCart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    return res.json({
      success: true,
      count: validCart.length,
      cartTotal,
      data: validCart.map((item) => ({
        _id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        category: item.product.category,
        stock: item.product.stock,
        imageUrl: item.product.imageUrl,
        manufacturer: item.product.manufacturer,
        quantity: item.quantity,
        addedAt: item.addedAt,
      })),
    });
  } catch (error) {
    console.error("Error getting cart");
    return res.status(500).json({
      success: false,
      message: "Failed getting cart",
    });
  }
};

exports.addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.isActive) {
      return res.status(400).json({
        success: false,
        message: "Product is not active",
      });
    }

    const qty = quantity || 1;
    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cart) {
      user.cart = [];
    } else {
      user.cart.push({
        product: productId,
        quantity: qty,
        addedAt: new Date(),
      });
    }

    await user.populate({
      path: "cart.product",
      select: "name price category, stock, imageUrl, manufacturer",
    });

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: user.cart,
    });
  } catch (error) {
    console.error("Error adding product to cart");
    return res.status(500).json({
      success: false,
      message: "Failed adding product to cart",
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId } = req.params.productId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cart) {
      user.cart = [];
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const product = await Product.findById(productId);
    if (product && product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${product.stock}`,
      });
    }

    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    return res.json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    console.error("Error updating cart");
    return res.status(500).json({
      success: false,
      message: "Failed updating cart",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cart) {
      user.cart = [];
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId,
    );

    await user.save();

    return res.json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.cart = [];
    await user.save();

    return res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};
