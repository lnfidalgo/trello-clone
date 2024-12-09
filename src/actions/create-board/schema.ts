import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Digite um nome.",
    }),
  image: z.string({
    required_error: "Selecione uma imagem.",
    invalid_type_error: "Selecione uma imagem.",
  }),
});
