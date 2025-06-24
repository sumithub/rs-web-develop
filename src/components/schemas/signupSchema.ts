// schemas/signupSchema.ts
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters.")
           .regex(/^(?!.*\s{3,})[A-Za-z\s]+$/, "Please enter a valid name (letters only)"),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
  ),
  termsAccepted: z.boolean().refine(val => val === true, {
  message: "You must accept the terms and conditions",
}),
userType: z.literal("USER"),
});

export type SignupFormData = z.infer<typeof signupSchema>;