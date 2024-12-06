import { AuthProviderLocal } from "@/app/context/AuthProvider";
import AuthProvider from "@/app/provider/AuthProvider";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function OganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthProviderLocal>
    <SidebarProvider>
      <AppSidebar />
      <main className="pt-20 md:pt-24 px-4 flex max-w-6xl 2xl:max-w-screen-xl">
        <SidebarTrigger className="" />
        <div>{children}</div>
      </main>
        </SidebarProvider>
      </AuthProviderLocal>
      </AuthProvider>
  );
}
