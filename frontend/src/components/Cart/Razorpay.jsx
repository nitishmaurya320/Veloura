import React from "react";
import axios from "axios";

export const Razorpay = ({ amount, onSuccess, onError }) => {
  const loadRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const { data: order } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
      amount
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Veloura",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        // This runs on payment success
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        email: localStorage.getItem("userEmail") || "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={loadRazorpay}>
      Pay ₹{amount}
    </button>
  );
};

export default Razorpay;
