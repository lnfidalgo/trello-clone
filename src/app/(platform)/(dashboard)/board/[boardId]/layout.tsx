import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { BoardNavbar } from "@/components/board/BoardNavbar";


export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  console.log("OOOOIII", params)
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;