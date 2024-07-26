import { z } from "zod";
const singInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(8, { message: "Password is required" }),
});

export { singInSchema}