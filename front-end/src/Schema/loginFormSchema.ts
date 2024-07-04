import { z } from "zod";

export const loginFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Must be a valid email" })
      .nonempty({ message: "Email is required" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Set the path of the error for confirmPassword
    message: "Passwords must match",
  });
