import Container from "@/components/container";
import React from "react";
import AddQuiz from "./_component/add_quiz";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const userId = auth();

  const quizzes = await prisma.quiz.findMany({ where: { userId: "test" } });

  return (
    <Container>
      <div>
        {quizzes.map((quiz) => (
          <a key={quiz.id} href={`/quizzes/${quiz.id}`}>
            <h1>{quiz.name}</h1>
          </a>
        ))}
      </div>
      <div>
        <AddQuiz />
      </div>
    </Container>
  );
};

export default page;
