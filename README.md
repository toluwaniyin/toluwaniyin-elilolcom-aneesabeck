# SkillGrow 🌱

SkillGrow is a web application designed to help users track their skill-building journey in a fun and engaging way. Users can log in with Google, visualize their progress through interactive "trees," and stay motivated by competing with friends on a leaderboard.

---

## 🌟 Features

- 🔐 **Google OAuth Login** – Secure authentication via Google.
- 🌳 **Progress Trees** – Tasks are represented as trees that grow as users progress.
- 📈 **Dashboard** – Real-time overview of personal stats and streaks.
- 🏆 **Leaderboard** – Compare your growth with friends.
- 📱 **Responsive Design** – Seamless experience across devices.

---

## 🛠️ Technologies Used

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.io](https://socket.io/) (for real-time updates)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Google OAuth](https://developers.google.com/identity)

---

## 📁 Project Structure

root/
├── client/ # Frontend code
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── client-socket.js # Socket.io client setup
│ │ └── utilities.js # Helper functions
│ └── ...
├── server/ # Backend code
│ ├── models/ # Mongoose models
│ ├── server.js # Main backend entry
│ ├── auth.js # Google OAuth logic
│ └── server-socket.js # Socket.io server logic
├── .env # Environment variables (not in repo)
├── package.json
├── vite.config.js
└── tailwind.config.js




---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>


Install Dependencies

npm install

Set Up Environment Variables

Create a .env file in the root directory.

Add the following variables:
CLIENT_ID=<your-google-oauth-client-id>
MONGO_URI=<your-mongodb-connection-string>


🚀 How to Run
Start the Backend Server
npm start

Start the Frontend Development Server
npm run dev

Access the Application

Open your browser and navigate to: http://localhost:5173
