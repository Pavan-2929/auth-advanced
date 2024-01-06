import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js'
import authRoutes from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mongoose Connected"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log("Server is started");
});

app.get('/', (req, res) => {
  res.json("Hi there")
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})
