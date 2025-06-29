import {z} from "zod";

export const ChangeEmailSchema = z.object({
  currentEmail: z.string().email("Please enter a valid email address."),
    newEmail: z.string().email("Please enter a valid email address.")})

export type ChangeEmailFormData = z.infer<typeof ChangeEmailSchema>;

export const ChangeEmailResponseSchema = z.object({
        message: z.string(),
        mockVerificationLink: z.string().url().optional(),
}
)
   export type ChangeEmailResponse = z.infer<typeof ChangeEmailResponseSchema>;

      