import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center bg-white justify-center h-full">
      <Navbar />
      {children}
    </div>
  );
}
