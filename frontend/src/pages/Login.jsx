import React, { useState } from "react";
import logonav from "../assets/image1/logonav.png";
import google from "../assets/image1/google.jpg";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {serverUrl} from '../App';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
 import {useDispatch} from 'react-redux'
  import {setUserData} from '../redux/userSlice';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { FaArrowLeft } from "react-icons/fa6";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {email, password},
        { withCredentials: true }
      );
       dispatch(setUserData(result.data))
      setLoading(false);
      
     setTimeout(() => {
  navigate("/");
      }, 1000);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const googleLogin = async()=>{
    try{
      const response = await signInWithPopup(auth, provider)
     let user = response.user
     let name = user.displayName
     let email = user.email
  

     const result = await axios.post(serverUrl + "/api/auth/googleAuth" , {name, email}, {withCredentials:true})
     dispatch(setUserData(result.data))
      navigate("/");
      toast.success("Login Successfully")

    }catch(error){
      console.log(error)
      toast.error(error.response.data.message);

    }
  }

  return (
    <div className="bg-gray-500 w-[100vw] h-[100vh] flex items-center justify-center">
      
      <form
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex relative"
        onSubmit={(e) => e.preventDefault()}
      >
         <FaArrowLeft className='absolute top-[10%] md:top-[10%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-col items-center justify-center gap-3 ">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Welcome back
            </h1>
            <h2 className="text-[#999797] text-[18px]">Login your account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 ">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border-1 w-[100%] h-[53px] border-[#e7e6e6] text-[15px] px-[20px]"
            />
          </div>

          <button
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] 
                   hover:bg-gray-700 hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>

          <span className="text-[13px] cursor-pointer text-[#585757]" onClick={()=> navigate("/forget")}>
            Forget Password?
          </span>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out" onClick={googleLogin}>
            <img src={google} alt="google" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f] text-sm flex items-center gap-1">
            Don't have na account?
            <span
              className="underline underline-offset-1 text-black cursor-pointer hover:text-blue-600 transition-colors duration-200"
              onClick={() => navigate("/signup")}
            >
              SignUp
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

export default Login;
