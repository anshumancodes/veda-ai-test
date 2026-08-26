import { questionExtractionSchema, type Question } from "./schemas/schemas";
import { gemini, GEMINI_MODEL } from "./client";

const QUESTION_PROMPT = `
You are extracting questions from a question paper.

Your job is to identify EVERY question in the document.

Rules:

1. Preserve the exact printed question numbering.
2. Treat labelled sub-parts as separate questions.
   Example:
   11 (a)
   11 (b)
   must become two separate questions.
3. Preserve the printed order.
4. Do not merge questions.
5. Do not invent questions.
6. Include the question text as accurately as possible.
7. Include the page number where the question begins.
8. If a question continues onto another page, keep it as one question.
9. Ignore headers, footers, instructions, page numbers and decorative text.
10. Return only questions that actually appear in the document.
`;

export async function extractQuestions(
  pages: Array<{
    page: number;
    mimeType: string;
    data: string;
  }>,
): Promise<Question[]> {
  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: QUESTION_PROMPT },

          ...pages.map((page) => ({
            inlineData: {
              mimeType: page.mimeType,
              data: page.data,
            },
          })),
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                number: { type: "string" },
                text: { type: "string" },
                page: { type: "integer" },
              },
              required: ["id", "number", "text", "page"],
            },
          },
        },
        required: ["questions"],
      },
    },
  });

  const parsed = questionExtractionSchema.parse(
    JSON.parse(response.text ?? "{}"),
  );

  return parsed.questions;
}
