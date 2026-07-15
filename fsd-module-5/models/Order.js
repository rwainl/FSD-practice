const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "failed", "cancelled", "processing", "shipped", "delivered"],
            default: "pending",
            index: true,
        },
        transactionStatus: {
            type: String,
        },
        paymentMethods: {
            type: String,
        },
        customerDetails: {
            name: String,
            email: String,
            phone: String,
            address: String,
        },
        midTransData: {
            transactionId: String,
            statusCode: String,
            grossAmount: Number,
            paymentType: String,
            transactionTime: Date,
            settlementTime: Date,
        },
    },
    {
        timestamps: true,
    }
)

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);

