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
      <div className="App">
        <div className="main">
          <h3 className="title">Genius Arena! Play a Game</h3>
          <AddQuiz />
          <div className="lead">
            <br></br>
            <a className="nav-button text-center" href="/leaderboard">
              Leaderboard
            </a>
            <div className="block text-center mt-10">
              <a className="text-xl underline mt-10" href="/tutorial">
                Tutorial
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
