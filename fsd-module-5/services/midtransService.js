/**
 * Midtrans Payment Gateway Service
 *
 * TODO untuk peserta:
 * 1. Setup Midtrans Snap API configuration
 * 2. Implement createTransaction(orderData)
 * 3. Implement verifySignatureKey untuk webhook security
 * 4. Implement handleNotification untuk process callbacks
 * 5. Parse transaction status
 */

const axios = require("axios");
const crypto = require("crypto");

class MidtransService {
  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY;
    this.clientKey = process.env.MIDTRANS_CLIENT_KEY;
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

    // Snap API URL
    this.snapURL = this.isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    if (!this.serverKey) {
      console.warn("  MIDTRANS_SERVER_KEY not set");
    }
  }

  async createTransaction(orderData) {
    try {
      const parameter = {
        transaction_details: {
          order_id: orderData.orderId,
          gross_amout: orderData.amount,
        },
        customer_details: {
          first_name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
        },
        item_details: orderData.items
      };

      const authString = Buffer.from(`${this.serverKey}: `).toString('base64');

      const response = await axios.post(
        this.snapURL,
        parameter,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${authString}`,
          }
        }
      );

      return {
        success: true,
        token: response.data.token,
        redirectURL: response.data.redirect_url,
      };
    } catch (error) {
      console.error(" Midtrans Error:", error.message);

      return {
        success: false,
        message: "Payment creation failed",
        error: error.message,
      };
    }
  }

  verifySignatureKey(orderId, statusCode, grossAmount, serverKey) {
    const signatureString = `${orderId}${statusCode}${grossAmout}${serverKey}`;

    return crypto.createHash('sha512').update(signatureString).digest('hex');
  }

  handleNotification(notification) {
    try {
      const calculatedSignature = this.verifySignatureKey(
        notification.order_id,
        notification.status_code,
        notification.gross_amount,
        this.serverKey,
      );

      if(calculatedSignature !== notification.signature_key) {
        return {
          success: false,
          message: "Invalid signature",
        };
      }

      const transactionStatus = notification.transaction_status;
      const fraudStatus = notification.fraud_status;

      let orderStatus;

      if(transactionStatus === "capture") {
        orderStatus = fraudStatus === "accept" ? "paid" : "fraud";
      } else if (transactionStatus === "settlement") {
        orderStatus = "paid";
      } else if (transactionStatus === "pending") {
        orderStatus = "pending";
      } else if (
        transactionStatus === "deny" ||
        transactionStatus === "cancel" ||
        transactionStatus === "expire" 
      ) {
        orderStatus = "failed";
      }

      return {
        success: true, 
        orderId: notification.order._id,
        transactionId: notification.transaction_id,
        status: orderStatus,
        paymentType: notification.payment_type,
        grossAmount: notification.gross_amount,
      };
    } catch (error) {
      console.error(" Webhook Error:", error.message);

      return {
        success: false,
        message: "Notification processing failed",
      };
    }
  }
}

module.exports = new MidtransService();
