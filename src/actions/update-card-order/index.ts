/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {

  const { items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
