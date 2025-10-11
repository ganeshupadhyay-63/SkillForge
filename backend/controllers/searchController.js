import Course from "../models/courseModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const prompt = `
You are an intelligent assistant for an LMS platform. 
A user will type a query about what they want to learn. 

Your task:
1. Analyze the query carefully.
2. Suggest 3-5 relevant course categories or levels from this list:
- Data Science, Data Analytics, Ethical Hacking, UI UX Designing, Web Development, Others
- Beginner, Intermediate, Advanced

3. For each suggested course category, provide a short description explaining why it is relevant to the query.
4. If the query is vague, provide guidance or clarification.

Return the result as a JSON object in this format (no extra text):
{
  "suggestions": [
    {"category": "Web Development", "description": "This course covers building websites ..."},
    {"category": "Data Science", "description": "Learn how to analyze data ..."}
  ]
}

User Query: ${input}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
   
    const keyword = response.text;

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });

    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      const courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { subTitle: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { level: { $regex: keyword, $options: "i" } },
        ],
      });
      return res.status(200).json(courses);
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to search: ${error.message}` });
  }
};
