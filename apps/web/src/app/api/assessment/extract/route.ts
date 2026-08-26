import { NextResponse } from "next/server";

import {
  extractQuestions,
  extractAnswers,
  mapAnswers,
} from "@repo/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const questionPages = body.questionPages;
    const answerPages = body.answerPages;

    if (
      !Array.isArray(questionPages) ||
      questionPages.length === 0
    ) {
      return NextResponse.json(
        {
          error: "No question paper pages provided",
        },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(answerPages) ||
      answerPages.length === 0
    ) {
      return NextResponse.json(
        {
          error: "No answer sheet pages provided",
        },
        { status: 400 },
      );
    }

    const [questions, answers] =
      await Promise.all([
        extractQuestions(questionPages),
        extractAnswers(answerPages),
      ]);

    const mappings = await mapAnswers(questions, answers);

    return NextResponse.json({
      questions,
      answers,
      mappings,
    });
  } catch (error) {
    console.error(
      "Assessment extraction failed:",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to extract assessment",
      },
      { status: 500 },
    );
  }
}