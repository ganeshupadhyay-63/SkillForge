import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMicCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";
import ai from "../assets/image1/ai.png";
import start from "../assets/image1/start.mp3";

function SearchWithAi() {
  const navigate = useNavigate();
  const startSound = new Audio(start);

  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState([]);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  // Initialize speech recognition once
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      console.log("Speech result:", transcript);
      setInput(transcript);
      await handleRecommendation(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      toast.error("Speech recognition error");
    };

    recognitionRef.current = recognition;
  }, []);

  // Speak text
  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.cancel(); // cancel any queued speech
    window.speechSynthesis.speak(utterance);
  };

  // Start voice search
  const handleSearch = async () => {
    setListening(true);
    if (!recognitionRef.current) return;
    startSound.play();
    recognitionRef.current.start();
  };

  // Fetch recommendations from backend
  const handleRecommendation = async (query) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/course/search",
        { input: query },
        { withCredentials: true }
      );
      console.log(result.data);
      setRecommendation(result.data);
      setListening(false);

      if (result.data.length > 0) {
        speak("These are the top courses I found for you");
      } else {
        speak("No courses found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch recommendations");
      setListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-1">
      {/* search container */}
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative mt-6">
        <FaArrowLeft
          className="text-black w-[22px] cursor-pointer absolute"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          <img
            src={ai}
            className="w-8 h-8 sm:w-[30px] sm:h-[30px]"
            alt="AI Logo"
          />
          Search With <span className="text-[#CB99C7]">Ai</span>
        </h1>

        {/* Input and buttons */}
        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            placeholder="What do you want to learn? (e.g AI, MERN, Cloud...)"
          />

          {input && (
            <button
              className="absolute right-14 sm:right-16 bg-white rounded-full"
              onClick={() => handleRecommendation(input)}
            >
              <img src={ai} className="w-10 h-10 p-2 rounded-full" alt="AI" />
            </button>
          )}

          <button
            className="absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleSearch}
          >
            <IoMicCircle className="w-5 h-5 text-[#cb87c5]" />
          </button>
        </div>

        {/* Display Recommendations */}
        <div className="mt-6 text-left">
          {recommendation.length > 0 ? (
            <ul className="space-y-2">
              {recommendation.map((course, idx) => (
                <li
                  key={idx}
                  className="bg-gray-800 text-white p-3 rounded-lg"
                >
                  {course.title || course.name || JSON.stringify(course)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mt-2">No results yet</p>
          )}
        </div>
      </div>

      {/* Results Section */}
      {recommendation.length > 0 ? (
        <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center">
            Ai Search Results
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {recommendation?.map((course, index) => (
              <div
                key={index}
                className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
              >
                <h2 className="text-lg font-bold sm:text-xl">{course.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{course.category}</p>
              </div>
            ))}
          </div>
        </div>
      ) : listening ? (
        <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
          Listening...
        </h1>
      ) : (
        <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
          No Courses Found Yet
        </h1>
      )}
    </div>
  );
}

export default SearchWithAi;
