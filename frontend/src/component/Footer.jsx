import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribedEmails, setSubscribedEmails] = useState([]);

  useEffect(() => {
    const emails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    setSubscribedEmails(emails);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    if (subscribedEmails.includes(email)) {
      toast.info("This email is already subscribed!");
      return;
    }

    const updatedEmails = [...subscribedEmails, email];
    setSubscribedEmails(updatedEmails);
    localStorage.setItem("subscribedEmails", JSON.stringify(updatedEmails));

    toast.success(`Subscribed successfully with ${email}!`);
    setEmail(""); // Clear input
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Logo & Description */}
        <div className="lg:w-[35%]">
          <img
            src="/logonav.png"
            alt="SkillForge Logo"
            className="h-16 mb-3 border rounded-md shadow-md bg-white"
          />
          <h2 className="text-lg font-bold text-white mb-3">SkillForge</h2>
          <p className="text-sm leading-relaxed">
            An AI-powered learning platform designed to help you grow smarter.
            Learn anything, anytime, anywhere with expert guidance.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:w-[20%]">
          <h3 className="text-white font-semibold mb-3 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "All Courses", path: "/allcourses" },
              { label: "Login", path: "/login" },
              { label: "My Profile", path: "/profile" },
            ].map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="hover:text-white cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="lg:w-[20%]">
          <h3 className="text-white font-semibold mb-3 text-lg">Categories</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Web Development",
              "App Development",
              "AI/ML",
              "UI/UX Design",
            ].map((cat, i) => (
              <li
                key={i}
                className="hover:text-white cursor-pointer relative group"
              >
                {cat}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:w-[25%] w-full">
          <h3 className="text-white font-semibold mb-3 text-lg text-center lg:text-left">
            Stay Updated
          </h3>
          <p className="text-sm mb-4 text-center lg:text-left">
            Subscribe to our newsletter for the latest updates & course offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-md text-black bg-white focus:outline-none w-full"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillForge. All rights reserved.
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </footer>
  );
}

export default Footer;
