# SkillForge - Learning Management System

## 🚀 Project Overview
**SkillForge** is a full-stack **Learning Management System (LMS)** designed to help students and instructors manage courses, track progress, and enhance online learning experiences.  
It features a **React + Vite frontend** and a **Node.js + Express backend** with MongoDB.

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)  
- **TailwindCSS**  
- **Redux Toolkit**  
- **React Router DOM**  
- **Firebase** (Authentication & Database)  
- **Recharts**, **React Spinners**, **React Toastify**  

### Backend
- **Node.js** + **Express.js**  
- **MongoDB** (Mongoose)  
- **JWT** Authentication  
- **File Uploads:** Multer + Cloudinary  
- **Email Notifications:** Nodemailer  
- **Payments:** Razorpay  
- **Other utilities:** dotenv, bcryptjs, validator, cors  

---

## 📁 Project Structure

```text

SkillForge/
├─ frontend/        # React frontend
│  ├─ src/          # Components, pages, Redux slices
│  ├─ public/       # Public assets (images, favicon)
│  ├─ package.json
├─ backend/         # Node.js backend
│  ├─ controllers/  # Route logic
│  ├─ models/       # MongoDB schemas
│  ├─ routes/       # Express routes
│  ├─ middlewares/  # Authentication / error handling
│  ├─ utils/        # Helper functions
│  ├─ index.js
│  ├─ package.json
├─ .gitignore
├─ README.md
⚡ Features
User authentication (Student / Instructor)

Role-based access control

Course creation and management

Enrollment & progress tracking

Payment integration with Razorpay

File uploads to Cloudinary

Email notifications

Interactive dashboards and charts

💻 Installation & Setup
1. Clone the repository

git clone https://github.com/ganeshupadhyay-63/SkillForge.git
cd SkillForge
2. Backend Setup

cd backend
npm install
Create a .env file in backend/:


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
Run the backend:


npm run dev
3. Frontend Setup

cd ../frontend
npm install
Create a .env file in frontend/:


VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Run the frontend:


npm run dev

📌 Notes
Make sure the backend server is running before starting the frontend.

.env files should never be pushed to GitHub.

node_modules/ and other large files are ignored via .gitignore.