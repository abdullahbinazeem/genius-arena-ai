import prisma from "@/lib/db";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: Response) {
  try {
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("accessed");

  const body = await req.json();
  const { category, difficulty, number } = body;

  if (!category) {
    return NextResponse.json("You did not provide a category");
  }

  const prompt = `
  Create a trivia question in the category "${category}" with a difficulty level of "${difficulty} out of 4".
  Format the response in JSON as follows:

    [
        {
        "question": "The trivia question",
        "options": [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        "answer": [index of option which is correct],
        "hint": "A hint to help the player answer the question"
        }
        ...
    ]

  Ensure the correct answer is among the options.
  `;

  let Questions = [];

  for (let i = 0; i < number; i++) {
    const response: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI trivia generator. Your completion must return JSON.`,
        },
        {
          role: "user",
          content:
            prompt +
            "Also, your answers must not include completions from questions before which include:" +
            Questions.map((questionStr) => questionStr),
        },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    Questions.push(response.choices[0].message.content!);
  }

  const Jsonified = Questions.map((questionStr) => JSON.parse(questionStr));

  console.log(Jsonified);

  const quiz = await prisma.quiz.create({
    data: {
      name: category,
      userId: userId,
      difficulty,
    },
  });

  // Create each question and its options individually
  for (const question of Jsonified) {
    await prisma.question.create({
      data: {
        question: question[0].question,
        hint: question[0].hint,
        answer: question[0].answer,
        quizId: quiz.id,
        options: {
          createMany: {
            data: question[0].options?.map((option: string) => ({
              option,
            })),
          },
        },
      },
    });
  }

  return NextResponse.json(quiz.id);
}
