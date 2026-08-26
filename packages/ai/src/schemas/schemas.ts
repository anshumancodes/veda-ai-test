import { z } from "zod";

export const questionSchema = z.object({
  id: z.string(),
  number: z.string(),
  text: z.string(),
  page: z.number().int().nonnegative(),
});

export const questionExtractionSchema = z.object({
  questions: z.array(questionSchema),
});

export const answerRegionSchema = z.object({
  page: z.number().int().nonnegative(),

  // Normalized coordinates: 0 -> 1
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  width: z.number().min(0).max(1),
  height: z.number().min(0).max(1),
});

export const answerSchema = z.object({
  id: z.string(),
  detectedQuestionNumber: z.string().nullable(),
  text: z.string(),
  regions: z.array(answerRegionSchema),
});

export const answerExtractionSchema = z.object({
  answers: z.array(answerSchema),
});

export const answerMappingSchema = z.object({
  mappings: z.array(
    z.object({
      answerId: z.string(),
      questionId: z.string().nullable(),
      confidence: z.number().min(0).max(1),
      reason: z.string(),
    }),
  ),
});

export type Question = z.infer<typeof questionSchema>;
export type Answer = z.infer<typeof answerSchema>;
export type AnswerRegion = z.infer<typeof answerRegionSchema>;
export type AnswerMapping = z.infer<
  typeof answerMappingSchema
>["mappings"][number];