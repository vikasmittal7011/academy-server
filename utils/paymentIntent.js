import { instance } from "./razorPayInstance.js";

export async function createPayment(req, res) {
    try {
        const options = {
            amount: Number(req.body.totalAmount * 100),
            currency: "INR",
        };
        const data = await instance.orders.create(options);

        res.json({ data, success: true, key: process.env.RAZOR_PAY_KEY })

    } catch (error) {
        return res.json({ message: error.message })
    }
}