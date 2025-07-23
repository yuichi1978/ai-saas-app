import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center">
      <Loader2 className="animate-spin mr-2" />
      <span>生成中...</span>
    </div>
  );
}
