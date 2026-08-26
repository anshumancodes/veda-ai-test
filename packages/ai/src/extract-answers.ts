import { answerExtractionSchema, type Answer } from "./schemas/schemas";
import { gemini, GEMINI_MODEL } from "./client";

const ANSWER_PROMPT = `
You are analyzing a student's handwritten answer sheet.

Extract every answer written by the student.

For each answer:

1. Identify the question number written by the student.
2. Preserve the detected question number exactly as written.
3. Transcribe the handwritten answer as accurately as possible.
4. Identify EVERY page containing that answer.
5. For every page, return bounding boxes covering the handwritten answer.

IMPORTANT:

- Answers may be written out of order.
- Answers may span multiple pages.
- An answer may contain multiple separated regions.
- Do not assume answer order matches question order.
- Do not assign a question number if you cannot determine it.
- Do not silently discard handwriting that does not appear to belong to a question.
- Include diagrams/working that are clearly part of the answer in the regions.

Coordinates must be NORMALIZED between 0 and 1.

Coordinate system:

x = distance from left edge
y = distance from top edge
width = box width
height = box height

Example:

{
  "page": 2,
  "x": 0.12,
  "y": 0.35,
  "width": 0.70,
  "height": 0.20
}

Return one answer object per distinct student answer.
`;

export async function extractAnswers(
  pages: Array<{
    page: number;
    mimeType: string;
    data: string;
  }>,
): Promise<Answer[]> {
  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { text: ANSWER_PROMPT },

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
          answers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                detectedQuestionNumber: {
                  type: ["string", "null"],
                },
                text: { type: "string" },
                regions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      page: { type: "integer" },
                      x: { type: "number" },
                      y: { type: "number" },
                      width: { type: "number" },
                      height: { type: "number" },
                    },
                    required: ["page", "x", "y", "width", "height"],
                  },
                },
              },
              required: ["id", "detectedQuestionNumber", "text", "regions"],
            },
          },
        },
        required: ["answers"],
      },
    },
  });

  const parsed = answerExtractionSchema.parse(
    JSON.parse(response.text ?? "{}"),
  );

  return parsed.answers;
}
