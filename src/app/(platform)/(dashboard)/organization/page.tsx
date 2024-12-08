import { BoardList } from "@/components/dashboard/BoardList";
import { Info } from "@/components/dashboard/Info";
import { Separator } from "@/components/ui/separator";

export default function OrganizationIdPage() {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}
