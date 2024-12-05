import { Input } from "@/components/ui/input";
import { create } from "@/hooks/use-create-board";

export default function OrganizationIdPage() {
  
  return (
    <div>
      <form action={create}>
        <Input
          id="title"
          name="title"
          required
          placeholder="Digite um titulo de board"
        />
      </form>
    </div>
  );
}
