import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import ClipLoader from "react-spinners/ClipLoader";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // for step1
  const sendOtp = async () => {
     if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // step 2
  const verifyOTP = async () => {
    if (!otp) return toast.error("Please enter the OTP");
    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.date);
      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // step 3
  const resetPassword = async () => {
    setLoading(true);
    console.log("Resetting password for email:", email);
    try {
      if (!newPassword || !conPassword) {
        return toast.error("Please enter all password fields");
      }
      if (newPassword !== conPassword) {
        return toast.error("Password is not match");
      }
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newPassword },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      navigate("/login");
      toast.success(result.data.message);

    } catch (error) {
     if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Try again.");
    }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 px-4">
      {/* step 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Your Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={sendOtp}
            >
              {" "}
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Sent OTP"
              )}{" "}
            </button>
          </form>

          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            <button>Back to Login </button>
          </div>
        </div>
      )}

      {/* step 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Please enter the 4-digit code sent to your email.
              </label>
              <input
                type="text"
                id="otp"
                placeholder="enter OTP here"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onClick={verifyOTP}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
          </form>

          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            <button>Back to Login </button>
          </div>
        </div>
      )}

      {/* step 3 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset you Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter a new password below to regain access to your account.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="conpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="conpassword"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={resetPassword}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            <button>Back to Login </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
