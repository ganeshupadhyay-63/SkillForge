import express from 'express'
import { createReview, getReviews } from '../controllers/reviewController.js'
import isAuth from '../middleware/isAuth.js'

const reviewRouter = express.Router()

reviewRouter.post("/createReview", isAuth, createReview)
reviewRouter.get("/getReview", getReviews)


export default reviewRouter;