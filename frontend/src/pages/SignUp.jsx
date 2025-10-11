import React, { useState } from "react";
import logonav from "../assets/image1/logonav.png";
import google from "../assets/image1/google.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { FaArrowLeft } from "react-icons/fa6";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, password, email, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      toast.success("Signup Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const gUser = response.user;
      const gName = gUser.displayName;
      const gEmail = gUser.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googleAuth`,
        { name: gName, email: gEmail, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      toast.success("Signup Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Google signup failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-500 w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex relative"
        onSubmit={handleSignUp}
        autoComplete="off"
       
      >
         <FaArrowLeft className='absolute top-[3%] md:top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="name"
              className="border-1 w-[100%] h-[53px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 ">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="email"
              className="border-1 w-[100%] h-[53px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="new-password"
              className="border-1 w-[100%] h-[53px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
          </div>

          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              className={`px-[10px] py-[5px] border-2 rounded-2xl cursor-pointer transition-colors
                ${
                  role === "student"
                    ? "border-black bg-black text-white"
                    : "border-[#e7e6e6] hover:border-black"
                }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[10px] py-[5px] border-2 rounded-2xl cursor-pointer transition-colors
                ${
                  role === "educator"
                    ? "border-black bg-black text-white"
                    : "border-[#e7e6e6] hover:border-black"
                }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>

          <button
            type="submit"
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] 
              hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div
            className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out"
            onClick={googleSignUp}
            tabIndex={0}
            role="button"
            aria-label="Sign up with Google"
          >
            <img src={google} alt="google" className="w-[25px] mr-2" />
            <span className="text-[18px] text-gray-500">Google</span>
          </div>
          <div className="text-[#6f6f6f] text-sm flex items-center gap-1">
            Already have an account?
            <span
              className="underline underline-offset-1 text-black cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[#000000] md:flex items-center justify-center flex-col hidden">
          <img
            src={logonav}
            alt="SkillForge Logo"
            className="w-80 h-80 shadow-2xl"
          />
          <span className="text-2xl text-white">SkillForge</span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;