import Razorpay from "razorpay"
import dotenv from 'dotenv';
dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET,
})