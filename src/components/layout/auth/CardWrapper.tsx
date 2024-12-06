import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  height?: string;
  hreflink: string;
  hreflinktext: string;
  subtitle: string;
  span: string;
}

export default function CardWrapper({
  children,
  hreflink,
  title,
  subtitle,
  height,
  span,
  hreflinktext,
}: Readonly<CardWrapperProps>) {
  return (
    <Card
      className={`bg-black-800 ${height} shadow-none border-none my-6 max-w-[420px] text-white py-4 px-2 3xl:my-auto`}
    >
      <CardHeader className="py-0">
        <CardTitle className="text-3xl text-white mb-5">{title}</CardTitle>
        <CardDescription className="text-lg font-semibold text-white">
          {subtitle}
        </CardDescription>
        <CardDescription className="flex flex-row align-middle gap-2">
          <span className="text-white">{span}</span>
          <Link href={hreflink} className="text-red-700 bold">
            {hreflinktext}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6 pb-4 md:pb-0">{children}</CardContent>
    </Card>
  );
}
