"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { Loader } from "lucide-react";

type Props = {};

const AddQuiz = (props: Props) => {
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createCourse = async () => {
    try {
      setIsLoading(true);

      if (!category) {
        toast.error("Please enter a category!");
        setIsLoading(false);
        return;
      }

      const response = await axios.post("/api/quizzes", {
        category: category,
        number: "5",
        difficulty: 2,
      });

      toast.success("Successfully created course.");
      setIsLoading(false);
    } catch {
      toast.error("Failed to create course, Try again!");
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="mt-10">
      <input
        type="text"
        placeholder="course category"
        className="border-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button
        onClick={() => {
          toast.success("clicked button.");
          createCourse();
        }}
        disabled={isLoading}
        className="block mt-2 p-3 bg-blue-500"
      >
        {!isLoading ? "Create Course" : <Loader className="animate-spin" />}
      </button>
    </div>
  );
};

export default AddQuiz;
