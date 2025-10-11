import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";

dotenv.config();

// ✅ Initialize Razorpay
const RazorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =======================
// 📌 Create Razorpay Order
// =======================
export const RazorpayOrder = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "CourseId is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.price || course.price <= 0) {
      return res.status(400).json({ message: "Invalid course price" });
    }

    const options = {
      amount: course.price * 100, // amount in paise
      currency: "INR",
      receipt: courseId.toString(),
    };

    const order = await RazorpayInstance.orders.create(options);

    console.log("✅ Razorpay order created:", order);

    return res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID, // send key to frontend
    });
  } catch (error) {
    console.error("❌ RazorpayOrder error:", error);
    return res.status(500).json({
      message: "Failed to create Razorpay order",
      details: error?.description || error.message,
    });
  }
};

// =======================
// 📌 Verify Payment
// =======================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      userId,
    } = req.body;

    // ✅ Check required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ message: "Payment verification data missing" });
    }

    // ✅ Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ Update user enrollment
    const user = await User.findById(userId);
    if (user && !user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    const course = await Course.findById(courseId).populate("lectures");
    if (course && !course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and enrollment successful",
    });
  } catch (error) {
    console.error("❌ verifyPayment error:", error);
    return res.status(500).json({
      message: "Internal server error during payment verification",
      details: error.message,
    });
  }
};



