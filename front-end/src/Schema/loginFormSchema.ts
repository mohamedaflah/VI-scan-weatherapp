import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Must be a valid email" })
    .nonempty({ message: "Email is required" }),
  password: z.string().nonempty({message:"Password required"}),
});
