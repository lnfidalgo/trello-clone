import { db } from "@/lib/db";

export const useFetchBoards = () => {
  const boards = db.board.findMany();
  return { boards };
};
