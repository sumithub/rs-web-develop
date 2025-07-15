import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address.")
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export const ForgotPasswordResponseSchema = z.string();
export type ForgotPasswordResponse = z.infer<
  typeof ForgotPasswordResponseSchema
>;
