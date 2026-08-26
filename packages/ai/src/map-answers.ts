import {
  answerMappingSchema,
  type Answer,
  type Question,
  type AnswerMapping,
} from "./schemas/schemas";

import {
  gemini,
  GEMINI_MODEL,
} from "./client";

export async function mapAnswers(
  questions: Question[],
  answers: Answer[],
): Promise<AnswerMapping[]> {
  const prompt = `
You are mapping student handwritten answers to questions from an examination paper.

QUESTION PAPER:

${questions
  .map(
    (q) =>
      `[${q.id}] Number: ${q.number}\nQuestion: ${q.text}`,
  )
  .join("\n\n")}

STUDENT ANSWERS:

${answers
  .map(
    (a) =>
      `[${a.id}]
Detected question number: ${
        a.detectedQuestionNumber ?? "UNKNOWN"
      }
Answer:
${a.text}`,
  )
  .join("\n\n")}

MAPPING RULES:

1. Match each student answer to the most likely question.

2. If the student explicitly wrote a question number and it clearly
matches a question, prefer that mapping.

3. If the question number is missing, incorrect, or ambiguous, use the
actual content of the answer to determine which question it answers.

4. The question's subject matter, terminology, equations, entities,
and requested proof/solution should be considered when matching.

5. Do NOT rely solely on the detected question number. It may be
incorrect due to handwriting recognition errors.

6. Never force an answer to a question when there is insufficient
evidence.

7. An answer can map to at most one question.

8. A question can have at most one primary answer.

9. If an answer cannot be confidently matched, return questionId null.

10. Return ALL student answers, including unmatched answers.

11. confidence must be a number between 0 and 1.

12. Use the following interpretation for confidence:
   - 0.90-1.00: very strong match
   - 0.75-0.89: strong match
   - 0.50-0.74: possible match
   - below 0.50: insufficient evidence; prefer null

13. Do not invent question IDs or answer IDs.

14. Return ONLY the requested JSON structure.
`;

  const response =
    await gemini.models.generateContent({
      model: GEMINI_MODEL,

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseJsonSchema: {
          type: "object",

          properties: {
            mappings: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  answerId: {
                    type: "string",
                  },

                  questionId: {
                    type: ["string", "null"],
                  },

                  confidence: {
                    type: "number",
                  },

                  reason: {
                    type: "string",
                  },
                },

                required: [
                  "answerId",
                  "questionId",
                  "confidence",
                  "reason",
                ],
              },
            },
          },

          required: ["mappings"],
        },
      },
    });

  const parsed = answerMappingSchema.parse(
    JSON.parse(response.text ?? "{}"),
  );

  return parsed.mappings;
}