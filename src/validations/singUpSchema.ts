import { z } from "zod";
const singUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(8, { message: "Password is required" }),
});

export { singUpSchema}