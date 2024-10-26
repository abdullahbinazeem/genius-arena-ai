"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { setCookie, getCookie } from "cookies-next";

import { useUser } from "@clerk/nextjs";

const QuestionOption = ({ quiz }: any) => {
  const { user } = useUser();

  const correctAlarm = new Audio("/correct.mp3");
  const wrongAlarm = new Audio("/wrong.mp3");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  const [onReveal, setOnReveal] = useState(false);

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const checkAnswer = async (index: number) => {
    if (index == quiz.questions[questionIndex].answer) {
      toast.success("Answer is correct");
      correctAlarm.play();
      setPoints(points + 50 * quiz.difficulty);
    } else {
      toast.error("Answer is wrong");
      wrongAlarm.play();
    }
    setOnReveal(true);

    await timeout(1500);

    if (questionIndex >= quiz.questions.length - 1) {
      const userData = {
        points: points,
        name: user?.firstName,
        quizCategory: quiz.name,
      };
      setCookie("leaderboard", JSON.stringify(userData), {
        maxAge: 60 * 60 * 24 * 7,
      });
      setFinished(true);
    } else {
      setQuestionIndex(questionIndex + 1);
      setOnReveal(false);
    }
  };

  return (
    <div>
      {!finished ? (
        <div className="App overflow-hidden h-[100vh]">
          <div className="flex justify-end pt-10">
            <div className="text-bold text-xl">{points}</div>
          </div>
          <div className="main -mt-10">
            <h3 className="title">Q{questionIndex + 1}</h3>
            <p>{quiz.questions[questionIndex].question}</p>
            {quiz.questions[questionIndex].options.map(
              (option: any, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      checkAnswer(index);
                      setOnReveal(true);
                    }}
                    className={cn(
                      "option border-2 my-4",
                      !onReveal ? "!border-none" : "border-2",
                      index == quiz.questions[questionIndex].answer
                        ? "!border-green-500"
                        : "!border-red-500"
                    )}
                  >
                    {option.option}
                  </button>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div className="grid place-content-center h-[100vh]">
          <h1 className="text-3xl font-bold">
            Good Job, You scored {points} out of{" "}
            {50 * quiz.difficulty * quiz.questions.length} possible!
          </h1>

          <div className="flex justify-center gap-5">
            <a
              className="bg-slate-200 hover:bg-slate-300 p-4 inline  mt-10 rounded-xl cursor-pointer transition-all"
              href="/quizzes"
            >
              Go Home
            </a>
            <a
              className="bg-slate-200 hover:bg-slate-300 p-4 inline mt-10 rounded-xl cursor-pointer transition-all"
              href="/quizzes"
            >
              Check Leaderboards
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionOption;
