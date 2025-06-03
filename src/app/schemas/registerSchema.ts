import { z } from "zod";

export const registerSchema = z.object({
    name: z.string()
    .min(5, "Please enter a valid name (letters only)")
    .regex(/^[A-Za-z\s]+$/, "Please enter a valid name (letters only)"),
    email: z.string().min(1, "Email is required")
    .email("Email is invalid")
     .refine(
      (email) => !["test@gmail.com", "admin@gmail.com"].includes(email),
      {
        message: "This email address is already in use. Please try another.",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
