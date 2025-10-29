import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import userRouter from './route/userRoute.js';
import cors from "cors";
import courseRouter from './route/courseRoute.js';
import paymentRouter from './route/paymentRoute.js';
import reviewRouter from './route/reviewRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8081;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://skillforge-frontend-t85z.onrender.com",
  credentials: true
}));

// authentication
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/order", paymentRouter);
app.use("/api/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("hello Ganesh");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectDb();
});
