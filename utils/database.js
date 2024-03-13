import { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connection = () => {
  return connect(process.env.MONGODB_CONNECTION_URI);
};

export default connection;
