import { useState, useEffect } from "react";
import { openDB } from "idb";
export default function Results() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    async function fetchAttempts() {
      const db = await openDB("quizDB", 1);
      const allAttempts = await db.getAll("attempts");
      setAttempts(allAttempts);
    }
    fetchAttempts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#6b3ddf]">Quiz Results</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center border-black border">
        {attempts.length > 0 ? (
          <ul className="text-left">
            {attempts.map((attempt, index) => (
              <li key={index} className="p-2 border-b">
                Attempt {index + 1}: Score - {attempt.score} ({attempt.date})
              </li>
            ))}
          </ul>
        ) : (
          <p>No attempts yet.</p>
        )}
      </div>
    </div>
  );
}
