"use server";

import { z } from "zod";

const CreateBoard = z.object({
  title: z.string(),
});
export async function create(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get("title"),
  });
  console.log(title);
}
