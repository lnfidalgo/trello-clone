"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

  try {
    await db.board.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization`);
  redirect(`/organization`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
