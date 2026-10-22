
<h1>🏋️Fitness Tracker</h1>

A full-stack fitness tracking application built with the MERN stack. Log
workouts, review your progress, explore an exercise library, and
generate curated workout plans tailored to your fitness goal, available
time, and difficulty level.

✨ ***Features***

1. Secure authentication - Sign up and log in using JWT-based
authentication.
2. Workout management - Add, view, edit and delete recorded
workouts.
3. Workout history - Search by exercise, filter by date, sort
results, recent workouts and full history.
4. Fitness dashboard - Review activity, duration, calories and
progress visualizations.
5. Exercise library - Browse exercises by fitness goal, with
descriptions and stored MET values.
6. Curated workout plans - Generate routines by goal, duration
(15, 30, 45, or 60 minutes) and difficulty.
7. Calorie estimates - Estimate active calories using the
exercise's stored MET value, duration and saved profile weight when
available.
8. Profile and goals - Manage profile information and fitness
goals.
9. Responsive interface - Use the app on desktop, tablet or
mobile screens.

**Note**: Calorie values are estimates, not medical measurements.
      ***MET & Calories:*** MET values are based on the [2024 Adult Compendium of Physical Activities](https://pacompendium.com/). Calories are estimated using MET, body weight and active duration:

`Calories ≈ (MET × 3.5 × weight (kg) × minutes) / 200`

*MET values remain fixed per activity; calorie estimates vary with weight and duration. Results are approximate.*
__________________________________________________________________________________________________
<H3>🧰Tech Stack</H3>

+ Frontend - React with Vite - Tailwind CSS v4 - Material UI X - Charts - React Router - Axios

+ Backend - Node.js and Express.js - MongoDB Atlas and Mongoose - JSON
Web Tokens (JWT) - bcryptjs - dotenv and CORS
_________________________________________________________________________________________________
<H3>🚀Run Locally</H3>

Prerequisites:

+ Git
+ Node.js (Node.js 20 recommended) and npm
+ A MongoDB Atlas account or another MongoDB instance

***Process:***

**1. Clone the repository**

git clone https://github.com/asthapandey2026/Fitness_Tracker.git
cd Fitness_Tracker

**Project layout:**
<blockquote>
Fitness Tracker/</br>
├── README.md</br>
├── backend/</br>
└── frontend/
</blockquote>blockquote>

**2. Set up the backend**

From the project root:

-cd backend

-npm install

-Create a file named .env inside backend/:
<p>PORT=5000</br>
MONGO_USERNAME="abc_db_user"</br>
MONGO_PASSWORD="urVRDbjtkVI8NJyV"</br>
  MONGO_URI=your_mongodb_connection_string</br>
  JWT_SECRET=replace_with_a_long_random_secret</p>


***Start the backend:***

-npm run dev

The API is expected at http://localhost:5173 with routes under /api.

***3. Set up the frontend***

Open a second terminal at the project root and run:

- cd frontend
- npm install
- npm run dev
<p>Open the local URL printed by Vite, commonly http://localhost:5173.</p>

***4. Check the API URL***

In frontend/src/services/api.js, confirm the API base URL matches your
backend. For local development, it is typically:

_http://localhost:5000/api_

_Update the frontend API configuration when using a different backend
port or a deployed API._
_________________________________________________________________________________________________
<H3>🗂️Project Structure</H3>
<blockquote>
Fitness_Tracker/</br>
├── backend/</br>
│   ├── config/</br>
│   ├── controllers/</br>
│   ├── middleware/</br>
│   ├── models/</br>
│   ├── routes/</br>
│   ├── seed/</br>
│   ├── server.js</br>
│   └── package.json</br>
└── frontend/</br>
    &nbsp;&nbsp;&nbsp;&nbsp;├── src/</br>
&nbsp;&nbsp;&nbsp;&nbsp;    │   ├── components/</br>
&nbsp;&nbsp;&nbsp;&nbsp;    │   ├── context/</br>
&nbsp;&nbsp;&nbsp;&nbsp;    │   ├── pages/</br>
&nbsp;&nbsp;&nbsp;&nbsp;    │   ├── services/</br>
&nbsp;&nbsp;&nbsp;&nbsp;    │   ├── App.jsx</br>
&nbsp;&nbsp;&nbsp;&nbsp;    │   └── main.jsx</br>
&nbsp;&nbsp;&nbsp;&nbsp;    └── package.json
  </blockquote>
________________________________________________________________________________________________
<h1>🔐Security Notes</h1>

+ Keep .env files, database connection strings, and JWT secrets out
of Git.
+ Use strong, unique secrets for local and production environments.
+ Configure MongoDB Atlas network access and production CORS settings
carefully.
+ Never put backend secrets in frontend environment variables.
_________________________________________________________________________________________________
<h1>📸Screenshots</h1>

Create a screenshots/ folder at the repository root and add your
actual UI images using the filenames below. Replace the paths if your
filenames differ.

**Dashboard**
Fitness Tracker dashboard

**Workout History**
Workout history and filters

**Add Workout**
Add Workout Form

**Curated Workout Plans**
Curated workout plans

_Made with 💚 to make workout tracking clearer, more consistent and
easier to follow._








