import React, { useState } from "react";
import logonav from "../assets/image1/logonav.png";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
   <div className="w-full h-[75px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-gradient-to-r from-gray-900/70 via-black/60 to-gray-800/70 backdrop-blur-lg shadow-md z-50">

      {/* Logo Section */}
      <div className="lg:w-[35%] w-[50%] lg:p-[30px] flex items-center mt-2">
        <img
          src={logonav}
          alt="logo"
          className="w-[120px] h-[120px] rounded-[5px]"
        />
      </div>

      {/* Right Section */}
      <div className="w-[30%] lg:flex items-center justify-center gap-3 hidden">
        {!userData && (
          <IoPersonCircle
            className="w-[35px] h-[35px] fill-white cursor-pointer hover:bg-gray-600 rounded-[10px]"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
        {userData?.photoUrl ? (
          <img
            src={userData?.photoUrl}
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"  onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          userData && (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {(userData?.name || '').slice(0, 1).toUpperCase()}
            </div>
          )
        )}

        {userData?.role === "educator" && (
          <div className="px-[15px] py-[7px] border-2 lg:border-white border-black lg:text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer hover:bg-gray-600"  onClick={() => navigate("/dashboard")}>
            Dashboard
          </div>
        )}
        {!userData ? (
          <span
            className="px-[15px] py-[7px] border-2 border-white text-white rounded-[10px] text-[16px] font-light cursor-pointer bg-[#000000d5] hover:bg-gray-600"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        ) : (
          <span
            className="px-[15px] py-[7px] border-2 border-white shadow-sm text-black rounded-[10px] shadow-black text-[16px] font-light cursor-pointer bg-[white] hover:bg-gray-600"
            onClick={handleLogOut}
          >
            Logout
          </span>
        )}

        {show && (
          <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-black hover:text-white cursor-pointer hover:bg-white">
            <span className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600" onClick={()=> navigate("/profile")}>
              My Profile
            </span>
            <span className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600" onClick={()=>navigate("/mycourses")}>
              My Courses
            </span>
          </div>
        )}
      </div>
      <GiHamburgerMenu
        className="w-[35px] h-[35px] lg:hidden fill-white cursor-pointer"
        onClick={() => setShowHam((prev) => !prev)}
      />
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg-hidden ${
          showHam
            ? "translate-x-[0] transition duration-600"
            : "translate-x-[100%] transition duration-600"
        }`}
      >
        <ImCross
          className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer absolute top-5 right-4"
          onClick={() => setShowHam((prev) => !prev)}
        />
        {!userData && (
          <IoPersonCircle
            className="w-[50px] h-[50px] border-white fill-white cursor-pointer hover:bg-gray-600 rounded-[10px]"
          />
        )}
        {userData?.photoUrl ? (
          <img
            src={userData?.photoUrl}
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"  onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          userData && (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              {(userData?.name || '').slice(0, 1).toUpperCase()}
            </div>
          )
        )}

        <div className="w-[200px] h-[60px] border-2 border-white text-white bg-[black] rounded-[10px] flex items-center justify-center text-[16px] font-light cursor-pointer hover:bg-gray-600" onClick={()=> navigate("/profile")}>
          My Profile
        </div>
        <div className="w-[200px] h-[60px] border-2 border-white text-white bg-[black] rounded-[10px] flex items-center justify-center text-[16px] font-light cursor-pointer hover:bg-gray-600" onClick={()=>navigate("/myenrolledment")}>
          My Courses
        </div>

        {userData?.role === "educator" && (
          <div className="w-[200px] h-[60px] border-2 border-white text-white bg-[black] rounded-[10px] flex items-center justify-center text-[16px] font-light cursor-pointer hover:bg-gray-600"  onClick={() => navigate("/dashboard")}>
            Dashboard
          </div>
        )}

        {!userData ? (
          <span
            className="w-[200px] h-[60px] border-2 border-white text-white bg-[black] rounded-[10px] flex items-center justify-center text-[16px] font-light cursor-pointer hover:bg-gray-600"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        ) : (
          <span
            className="w-[200px] h-[60px] border-2 border-white text-white bg-[black] rounded-[10px] flex items-center justify-center text-[16px] font-light cursor-pointer hover:bg-gray-600"
            onClick={handleLogOut}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
}

export default Nav;