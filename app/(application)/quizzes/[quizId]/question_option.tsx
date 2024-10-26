"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const QuestionOption = ({ quiz }: any) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [onReveal, setOnReveal] = useState(false);

  return (
    <div className="App">
      <div className="main">
        <h3 className="title">Q{questionIndex + 1}</h3>
        <p>{quiz.questions[questionIndex].question}</p>
        {quiz.questions[questionIndex].options.map(
          (option: any, index: number) => {
            return (
              <button
                onClick={() => {
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
  );
};

export default QuestionOption;
