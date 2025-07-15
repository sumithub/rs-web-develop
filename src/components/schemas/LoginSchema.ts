import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    ),
  rememberMe: z.boolean().optional()
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
  data: z.string(),
  status: z.literal(200),
  statusText: z.string().optional(),
  headers: z.object({
    authorization: z.string()
  })
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
