"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Question = {
  question: string;
  answer: string;
};

const personalQuestions: Question[] = [
  { question: "WHERE DID WE GO TO ON OUR FIRST DATE? 💖", answer: "mkt" },
  { question: "WHEN IS OUR ANNIVERSARY? 😌", answer: "04/11/2025" },
  { question: "WHO LOVES YOU THE MOST??", answer: "KANISHKA" },
];

export default function Questions({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
  if (step === 0 || step === 1) {
    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 2500); // 2.5 seconds per screen

    return () => clearTimeout(timer);
  }
}, [step]);

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [chances, setChances] = useState(3);
  const [blocked, setBlocked] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const nextStep = () => {
    setError("");
    setStep((prev) => prev + 1);
  };

  const handleTypedSubmit = () => {
    const correct = personalQuestions[step - 4].answer
      .toLowerCase()
      .trim();
    const user = input.toLowerCase().trim();

    if (user === correct) {
        setError("");  
    setChances(3); 
      setShowHearts(true);
      setTimeout(() => {
        setShowHearts(false);
        setInput("");


        if (step - 4 < personalQuestions.length - 1) {
          setStep(step + 1);
        } else {
          setStep(7); // yayay passed screen
        }
      }, 1500);
    } else {
      if (chances > 1) {
        setChances(chances - 1);
        setError(`Uhh… ${chances - 1} chances left 😒`);
      } else {
        setBlocked(true);
      }
    }
  };

  if (blocked) {
    return (
      <div className="text-center text-white">
        <h2 className="text-5xl font-bold">Access Blocked 🚫</h2>
        <p className="mt-6 text-rose-400 text-xl">
          You failed the love test 😤
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center text-white relative max-w-xl"
    >
      {/* Floating Hearts */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -200, opacity: 0 }}
              transition={{ duration: 2, delay: i * 0.1 }}
              className="absolute left-1/2 text-pink-400 text-2xl"
              style={{ marginLeft: `${Math.random() * 200 - 100}px` }}
            >
              💖
            </motion.div>
          ))}
        </div>
      )}

      {/* STEP 0 */}
      {step === 0 && (
        <>
          <h2 className="
text-4xl md:text-5xl font-bold
text-neutral-900
drop-shadow-[0_6px_20px_rgba(255,255,255,0.7)]
tracking-wide
">
            Welcome to the Love Game 💘
          </h2>
        </>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h2 className="
text-4xl md:text-5xl font-bold
text-neutral-900
drop-shadow-[0_6px_20px_rgba(255,255,255,0.7)]
tracking-wide
">
            To play this you must answer a few questions 😌
          </h2>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="
text-4xl md:text-5xl font-bold
text-neutral-900
drop-shadow-[0_6px_20px_rgba(255,255,255,0.7)]
tracking-wide
">
            Are you ready? 💖
          </h2>
          <div className="mt-8 flex justify-center gap-6">
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-pink-500 rounded-lg"
            >
              Yes 😍
            </button>
            <button
              onClick={() => setError("Shut up and say YES 😒")}
              className="px-6 py-2 bg-gray-500 rounded-lg"
            >
              No 🙄
            </button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h2 className="
text-4xl md:text-5xl font-bold
text-neutral-900
drop-shadow-[0_6px_20px_rgba(255,255,255,0.7)]
tracking-wide
"
>
            Promise you won’t quit? 🥺
          </h2>
          <div className="mt-8 flex justify-center gap-6">
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-pink-500 rounded-lg"
            >
              I Promise 💞
            </button>
            <button
              onClick={() => setError("Only YES is allowed 😈")}
              className="px-6 py-2 bg-gray-500 rounded-lg"
            >
              No 😶
            </button>
          </div>
        </>
      )}

      {/* PERSONAL QUESTIONS */}
      {step >= 4 && step <= 6 && (
        <>
          <h2 className="
text-4xl md:text-5xl font-bold
text-neutral-900
drop-shadow-[0_6px_20px_rgba(255,255,255,0.7)]
tracking-wide
"
>
            {personalQuestions[step - 4].question}
          </h2>

          <div className="mt-10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-6 py-3 rounded-xl text-black text-lg w-full max-w-md"
              placeholder="Type your answer..."
            />

            <button
              onClick={handleTypedSubmit}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl text-lg"
            >
              Submit 💘
            </button>
          </div>
        </>
      )}

      {/* PASSED SCREEN */}
      {step === 7 && (
        <>
          <h2 className="
text-4xl md:text-5xl font-bold
text-neutral-900
drop-shadow-[0_6px_20px_rgba(255,255,255,0.7)]
tracking-wide
">
            Yayayyyy 💕 You have passed!
          </h2>
          <button
            onClick={onFinish}
            className="mt-10 px-8 py-3 bg-pink-500 rounded-xl"
          >
            Enter the Game 💘
          </button>
        </>
      )}

      {error && (
  <div className="mt-8 flex justify-center">
    <div
      className="
      px-6 py-3
      bg-black/40
      backdrop-blur-md
      rounded-xl
      border border-red-500/40
      shadow-[0_0_25px_rgba(255,0,0,0.6)]
      "
    >
      <p className="
        text-red-500
        font-bold
        text-lg
        tracking-wide
        animate-pulse
      ">
        {error}
      </p>
    </div>
  </div>
)}

    </motion.div>
  );
}
