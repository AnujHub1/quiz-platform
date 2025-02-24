import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { openDB } from "idb";

const questions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    id: 2,
    question: "Which data structure organizes items in a FIFO manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    id: 3,
    question:
      "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
  },
  {
    id: 5,
    question: "Which of these processes is not involved in refining petroleum?",
    options: [
      "Fractional distillation",
      "Cracking",
      "Polymerization",
      "Filtration",
    ],
    answer: "Filtration",
  },
  {
    id: 6,
    question: "What is the value of 12 + 28?",
    answer: 40,
    type: "integer",
  },
  {
    id: 7,
    question: "How many states are there in the United States?",
    answer: 50,
    type: "integer",
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    answer: 1776,
    type: "integer",
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    answer: 3,
    type: "integer",
  },
  {
    id: 10,
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: 120,
    type: "integer",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  async function saveAttempt() {
    const db = await openDB("quizDB", 1, {
      upgrade(db) {
        db.createObjectStore("attempts", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    });
    await db.put("attempts", { score, date: new Date().toLocaleString() });
  }

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong!");
    }
  };

  const handleNextQuestion = async () => {
    setFeedback("");
    setSelectedAnswer(null);
    setTimeLeft(30);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await saveAttempt();
      router.push("/results");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#6b3ddf]">Quiz Platform</h1>
      <div className="text-black border-black border shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-xl font-bold mb-4">
          {questions[currentQuestion].question}
        </h2>
        {questions[currentQuestion].options ? (
          questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-2 my-2 rounded ${
                selectedAnswer === option
                  ? "bg-purple-400 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          ))
        ) : (
          <input
            type="number"
            className="w-full p-2 border rounded border-black"
            onChange={(e) => setSelectedAnswer(Number(e.target.value))}
            value={selectedAnswer || ""}
          />
        )}
        <p className="my-4 text-base font-semibold">{feedback}</p>
        <p className="my-5 text-sm text-gray-700">Time left: {timeLeft}s</p>
        <button
          onClick={handleNextQuestion}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-800 text-white rounded"
        >
          {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
