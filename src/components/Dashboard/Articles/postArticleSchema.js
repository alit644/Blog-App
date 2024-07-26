import { z } from "zod";
export const postArticleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  excert: z.string().min(1, { message: "Excert is required" }),
  image: z
    .string()
    .url()
    .regex(
      /\.(jpeg|jpg|gif|png)$/,
      "Must be a valid image URL ending with jpeg, jpg, gif, or png"
    ),
  body: z.string().min(20, { message: "Body is required" }),
  categoryId: z.string().nonempty("You must select an option"),
});
