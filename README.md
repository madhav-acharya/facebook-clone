# 📘 Facebook Clone - MERN Stack

A full-featured Facebook clone built using the **MERN Stack (MongoDB, Express, React, Node.js)**. This project mimics core functionalities of Facebook, including user authentication, posting, liking, commenting, profile pages, and more.

## 🚀 Features

- 🔐 User Registration & Login (JWT-based authentication)
- 🖼️ Create Posts (text + image support)
- ❤️ Like and 💬 comment on posts
- 🧑‍🤝‍🧑 Friend system (Send/Accept Requests)
- 🗂️ User profile with post history
- 📸 Upload and update profile & cover photos
- 🔔 Real-time notifications (optional with sockets)
- 🌓 Dark/Light mode toggle (optional)
- ⚙️ Responsive design for all devices

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux (for state management)
- React Router DOM
- Axios
- Vanila CSS

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- Multer (for file uploads)
- Bcrypt (for password hashing)

## 🧾 Installation

### Prerequisites
- Node.js & npm
- MongoDB installed locally or access to MongoDB Atlas

### Clone the repo

```bash
git clone https://github.com/madhav-acharya/facebook-clone.git
cd fb-clone
npm install
cd frontend npm start
cd ../backend && npm run dev
