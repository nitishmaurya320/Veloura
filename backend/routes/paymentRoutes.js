// routes/payment.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create-order", async (req, res) => {
    const { amount, currency = "INR" } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paisa
            currency,
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Razorpay order creation failed", error: err });
    }
});

module.exports = router;
