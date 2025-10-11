import express from "express"
import { CreateCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture, getCreatorById } from "../controllers/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create", isAuth, CreateCourse);

courseRouter.get("/getPublished", getPublishedCourses);
courseRouter.get("/getCreator", isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId", isAuth, upload.single ("thumbnail"), editCourse)
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById )
courseRouter.delete("/remove/:courseId", isAuth, removeCourse)
import {searchWithAi} from "../controllers/searchController.js"


// for lectures
courseRouter.post("/createlecture/:courseId", isAuth, createLecture )
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture)
courseRouter.delete("/removelecture/:courseId", isAuth, removeLecture)
courseRouter.post("/creator",isAuth, getCreatorById)
export default courseRouter


// for search with ai
courseRouter.post("/search", searchWithAi)
