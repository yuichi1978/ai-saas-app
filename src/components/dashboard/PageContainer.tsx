import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return <div className="p-8 pt-6 space-y-4">{children}</div>;
}
