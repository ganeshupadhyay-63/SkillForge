
import Course from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import Lecture from "../models/lectureModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js"

export const CreateCourse = async(req , res)=>{
    try{
        const{title, category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"Title or Category is required"})

        }
        const course = await Course.create({
            title,
            category,
            creator:req.userId
        })
        return res.status(201).json(course)

    }catch(error){
        return res.status(500).json ({message:`CreateCourse error ${error}`})

    }
}

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate({
        path: "lectures",
        select: "lectureTitle videoUrl isPreviewFree",
      })
      .populate({
        path: "reviews",
        select: "rating comment user reviewedAt",
        populate: { path: "user", select: "name email" },
      });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No published courses found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error in getPublishedCourses:", error);
    return res.status(500).json({
      message: "Failed to fetch published courses",
      error: error.message,
    });
  }
};




export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;

   
    const courses = await Course.find({ creator: userId }).sort({ createdAt: -1 });

   
    return res.status(200).json(courses);

  } catch (error) {
    return res.status(500).json({ message: `Failed to get creator courses: ${error}` });
  }
};


export const editCourse = async(req,res)=>{
    try{
        const {courseId} = req.params
        const {title, subTitle,description, category, level, isPublished, price} = req.body
        
        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)

        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message: "Course is not found"})

        }
        const updateData = {title, subTitle,description, category, level, isPublished, price, thumbnail}
       course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json(course)


    }catch(error){
         return res.status(500).json({message:`failed to get Edit Course ${error}`})


    }
}

export const getCourseById = async(req,res)=>{
    try{
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message: "Course is not found"})
        }
        return res.status(200).json(course)
       

    }catch(error){
         return res.status(500).json({message:`failed to get Course by id ${error}`})

    }
}

export const removeCourse = async(req, res)=>{
    try{
        const {courseId} = req.params
         let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message: "Course is not found"})
        }
        course = await Course.findByIdAndDelete(courseId, {new:true})
        return res.status(200).json({message: "Course removed"})

    }catch(error){
         return res.status(500).json({message:`failed to delete Course by id ${error}`})

    }
}


// for lecture

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle) {
      return res.status(400).json({ message: "Lecture title is required" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create lecture
    const lecture = await Lecture.create({ lectureTitle });

    // Attach lecture to course
    course.lectures.push(lecture._id);
    await course.populate("lectures");
    await course.save();

    return res.status(201).json({ lecture, course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Failed to create lecture: ${error.message}` });
  }
};


//  find lecture through course
export const getCourseLecture = async(req, res)=>{
    try{
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json ({message: "Course not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(201).json({course})

    }catch(error){
        return res.status(500).json({message:`failed to get Course Lecture ${error}`})

    }
}

export const editLecture = async(req, res)=>{
    try{
        const {lectureId} = req.params
        const {isPreviewFree, lectureTitle} = req.body
        const lecture = await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(404).json ({message: "Lecture not found"})

        }

        let videoUrl
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree
        await lecture.save()
        return res.status(200).json (lecture)

    }catch(error){
        return res.status(500).json({message:`failed to edit Lecture ${error}`})

    }
}

export const removeLecture = async(req, res)=>{
    try{
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({message: "Lecture is not found"})
        }

        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message: "Lecture removed"})

    }catch(error){
        return res.status(500).json({message:`failed to remove Lecture ${error}`})

    }
}


// get creator
export const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get creator: ${error}` });
  }
};
