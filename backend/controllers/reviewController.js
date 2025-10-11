import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";

// Create Review
export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;
    const userId = req.userId;

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already reviewed
    const alreadyReviewed = await Review.findOne({ course: courseId, user: userId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this course" });
    }

    // Create new review
    const review = new Review({
      course: courseId,
      user: userId,
      rating,
      comment,
    });

    await review.save();

    // Push review ID into course reviews
    course.reviews.push(review._id);
    await course.save();

    // Populate before sending response
    const populatedReview = await Review.findById(review._id)
      .populate("user", "name photoUrl description")
      .populate("course", "title thumbnail");

    return res.status(201).json(populatedReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Failed to create review: ${error.message}` });
  }
};

// Get All Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "name photoUrl description")
      .populate("course", "title thumbnail")
      .sort({ createdAt: -1 });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Failed to get reviews: ${error.message}` });
  }
};
