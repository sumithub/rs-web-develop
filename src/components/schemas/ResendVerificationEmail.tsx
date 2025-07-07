import {z} from "zod";

export const ResendEmailVerificationSchema = z.object({
 
    email: z.string().email("Please enter a valid email address.")})

export type ResendEmailVerificationData = z.infer<typeof ResendEmailVerificationSchema>;

export const ResendEmailVerificationResponseSchema = z.string()

export type VerificationEmailResponse = z.infer<typeof ResendEmailVerificationResponseSchema>;

      