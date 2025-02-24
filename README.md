Quiz Platform

Overview

The Quiz Platform is an interactive web application built with Next.js. It allows users to answer multiple-choice and numeric questions with a timer. The platform records quiz attempts using IndexedDB and displays previous scores on a results page.

Features

Multiple-choice and numeric input questions.

Timed quiz (30 seconds per question).

Score tracking and feedback on answers.

Persistent quiz history stored in IndexedDB.

Results page displaying past quiz attempts.

Responsive UI with Tailwind CSS.

Installation and Setup

Prerequisites

Ensure you have the following installed:

Node.js (latest LTS version recommended)

npm or yarn

Steps to Run Locally

Clone the repository:

git clone https://github.com/yourusername/quiz-platform.git
cd quiz-platform

Install dependencies:

npm install
# or
yarn install

Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser.

Deployment

The app is deployed on Vercel. You can access it here:
🔗 Live Demo

Code Structure

pages/index.js: Main quiz component.

pages/results.js: Displays quiz results.

components/Quiz.js: Handles question navigation, answer selection, and scoring.

styles/: Contains Tailwind CSS styles.

Technologies Used

Next.js - React framework for server-side rendering.

Tailwind CSS - Styling framework.

IndexedDB - Local database for storing quiz attempts.

Future Improvements

User authentication for personalized quiz tracking.

Category-based quizzes.

Leaderboard system.

More detailed analytics on performance.

Contributing

Pull requests are welcome! Please ensure your changes maintain clean and modular code.
