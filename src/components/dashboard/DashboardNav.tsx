"use client";

import { navItems } from "@/config/nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/auth/AuthButton";

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="grid gap-2 items-start">
        {navItems.map((item) => (
          <Button
            asChild
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              pathname === item.href && "bg-accent"
            )}
          >
            <Link href={item.href}>
              {item.icon && <item.icon className="w-10 h-10 mr-1" />}
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="my-4 px-4 md:hidden">
        <AuthButton />
      </div>
    </>
  );
}
