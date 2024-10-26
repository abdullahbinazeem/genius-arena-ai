"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { Loader } from "lucide-react";

import { useRouter } from "next/navigation";

type Props = {};

const AddQuiz = (props: Props) => {
  const router = useRouter();

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
      router.push(`/quizzes/${response.data}`);
    } catch {
      toast.error("Failed to create course, Try again!");
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="mt-10">
      <p>Enter a topic and press the play button to start a new game!</p>
      <br></br>
      <input
        type="text"
        placeholder="course category"
        className="border-2 textinput m-auto"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br></br>
      <button
        onClick={() => {
          toast.success("clicked button.");
          createCourse();
        }}
        disabled={isLoading}
        className="nav-button text-center m-auto"
      >
        {!isLoading ? "Create Quiz!" : <Loader className="animate-spin" />}
      </button>
    </div>
  );
};

export default AddQuiz;
