import React from "react";
import prisma from "@/lib/db";
import Container from "@/components/container";
import QuestionOption from "./question_option";

type Props = {
  params: {
    quizId: string;
  };
};

const page = async ({ params }: Props) => {
  const { quizId } = await params;

  const quiz = await prisma?.quiz.findFirst({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  return (
    <Container className="grid h-[100vh] place-content-center">
      <QuestionOption quiz={quiz} />
    </Container>
  );
};

export default page;
