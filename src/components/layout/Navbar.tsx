import Image from "next/image";
import { Button } from "../ui/button";
import Marca from "@/components/ux/marca.svg";
import { FaPlus } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="bg-black w-28 h-7 flex items-center justify-center">
          <Image src={Marca} priority alt="Marca da emrpesa FarenX" />
        </div>
        <Button
          size={"sm"}
          className="hidden md:block h-auto py-1.5 px-2 rounded-sm"
        >
          Criar
        </Button>
        <Button
          size={"sm"}
          className="block md:hidden h-auto py-1.5 px-2 rounded-sm"
        >
          <FaPlus />
        </Button>
      </div>
    </nav>
  );
}
