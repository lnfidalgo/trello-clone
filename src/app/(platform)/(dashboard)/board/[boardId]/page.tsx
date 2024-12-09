import { ListContainer } from "@/components/board/ListContainer";
import { db } from "@/lib/db";
interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { boardId } = await params;
  const lists = await db.list.findMany({
    where: {
      boardId: boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
}
