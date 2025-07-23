import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";
import MobileNav from "@/components/dashboard/MobileNav";
import AuthButton from "@/components/auth/AuthButton";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex items-center h-16 px-6">
          <MobileNav />
          <div className="flex justify-between w-full">
            <Link href="/">
              <h1 className="text-lg font-bold">AI Image Generator</h1>
            </Link>
            <div className="hidden md:block">
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* dashboard */}
      <div
        className="
          container mx-auto md:grid md:grid-cols-[220px_minmax(0,1fr)]
          md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
      >
        {/* sidebar */}
        <aside className="fixed md:sticky top-16 z-30 hidden md:block border-r h-[calc(100vh-65px)]">
          <div className="py-4 px-4 lg:py-8">
            <DashboardNav />
          </div>
        </aside>
        {/* main contents */}
        <main className="w-full flex flex-col overflow-hidden py-4 px-4">
          {children}
        </main>
      </div>

      <Toaster />
    </div>
  );
}
