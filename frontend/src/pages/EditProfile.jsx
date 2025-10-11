import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState(null); // Local file
  const [photoPreview, setPhotoPreview] = useState(""); // Preview URL
  const [loading, setLoading] = useState(false);

  // Initialize form with current user data
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setDescription(userData.description || "");
      setPhotoPreview(userData.photoUrl || "");
    }
  }, [userData]);

  // Update preview when user selects new file
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleEditProfile = async () => {
    if (!name.trim()) return toast.error("Name is required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photoFile) formData.append("photoUrl", photoFile);

      const { data } = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      // Ensure photoUrl is string
      const updatedUser = {
        ...data,
        photoUrl: typeof data.photoUrl === "object" ? data.photoUrl.url : data.photoUrl
      };

      dispatch(setUserData(updatedUser));

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Edit profile error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeft
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer active:bg-[#4b4b4b] transition"
          onClick={() => navigate("/profile")}
        />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Avatar Preview */}
          <div className="flex flex-col items-center text-center">
            {photoPreview ? (
              <img
                src={photoPreview}
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
                alt="avtar"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          {/* Upload New Avatar */}
          <div>
            <label className="text-sm font-medium text-gray-700">Select Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">UserName</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              readOnly
              type="email"
              value={userData?.email || ""}
              className="w-full px-4 py-2 border rounded-md text-sm bg-gray-100"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about yourself"
              rows={3}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleEditProfile}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md font-medium flex justify-center items-center transition"
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
