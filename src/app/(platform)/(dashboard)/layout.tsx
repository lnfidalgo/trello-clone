import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black-200 h-full">
      <Navbar />
      {children}
    </div>
  );
}
