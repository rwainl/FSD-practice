/**
 * Order Controller
 * 
 * TODO untuk peserta:
 * 1. Import Order model
 * 2. Implement getOrderHistory:
 *    - Get user dari req.user
 *    - Get pagination params (page, limit)
 *    - Get status filter (optional)
 *    - Query orders dengan filters
 *    - Populate product details
 *    - Return orders dengan pagination info
 * 
 * 3. Implement getOrderById:
 *    - Get orderId dari params
 *    - Get user dari req.user
 *    - Find order by orderId dan user
 *    - Populate product details
 *    - Return order
 * 
 * Reference: ../finished-project/controllers/orderController.js
 */

// TODO: Import dependencies
// const Order = require('../models/Order');
const Order = require('../models/Order');

exports.getOrderHistory = async(req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, status } = req.query;

        const query = { user: userId }; 
        if(status) {
            query.status = status
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const orders = await Order.find(query);

        const total = await Order.countDocuments(query);

        res.status(200).json({
            success: true,
            count: orders.length,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total/parseInt(limit)),
            data: orders,
        })
    } catch (error) {
        console.error("Error getting order history");
        res.status(500).json({
            success: false,
            message: "Failed getting order history",
        });
    }
}

exports.getOrderById = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { orderId } = req.params.orderId;

        const order = await Order.findOne({
            orderId: orderId,
            user: userId,
        }).populate({
            path: "items.product",
            select: "name price category imageUrl manufacturer description",
        })

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.json({
            success: true,
            data: order,
        })
    } catch (error) {
        console.error("Error getting specific order");
        res.status(500).json({
            success: false,
            message: "Failed getting specific order",
        });
    }
}
