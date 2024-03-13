import HttpError from "../models/http-error.js";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const { verify } = jwt;

export default (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const otp = req.cookies.otp;
        if (!otp) {
            return next(new HttpError("OTP Not Found", 404));
        }

        const otpValue = verify(otp, process.env.JWT_TOKEN);

        if (+otpValue.otp === +req.body.otp) {
            return next();
        }
        return next(new HttpError("Incorrect OTP", 401));

    } catch (err) {
        return next(new HttpError(err.message, 500));
    }
};
