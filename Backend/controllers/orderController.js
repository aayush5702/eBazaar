import Stripe from "stripe";
import { User } from "../models/userModel.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = await User.findOne({ _id: req.user });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1PdmnDEqva2U2rnahZLRI7JW" }],
      customer_email: user.email,
      metadata: {
        userId: user._id.toString(),
      },
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.ProductImage,
              metadata: {
                productId: item.productId._id.toString(),
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session); // Return 200 status code
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
