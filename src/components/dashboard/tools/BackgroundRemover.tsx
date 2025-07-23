/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { removeBackground } from "@/actions/actions";
import { RemoveBackgroundState } from "@/types/actions";
import { Download, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { toast } from "sonner";

const initialState: RemoveBackgroundState = {
  status: "idle",
};

export default function BackgroundRemover() {
  const [state, formAction, isPending] = useActionState(
    removeBackground,
    initialState
  );

  const handleDownload = () => {
    if (!state.processedImage) return;

    try {
      const base64Data = state.processedImage.split(",")[1];
      const blob = new Blob([Buffer.from(base64Data, "base64")], {
        type: "image/png",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `background-removed.png`;

      document.body.appendChild(link);
      link.click();

      // 一時的なリンクを削除
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">ファイルをアップロード</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full"
              required
            />
          </div>
          {/* submit button */}
          <Button
            type="submit"
            disabled={isPending}
            className={cn("w-full duration-200", isPending && "bg-primary/80")}
          >
            {isPending ? (
              <LoadingSpinner />
            ) : (
              <>
                <Layers className="mr-2" /> 背景を削除
              </>
            )}
          </Button>
        </form>
      </div>

      {/* image preview */}
      {/* state.imageUrlとは画像が存在するときだけ表示させるロジック */}
      {state.processedImage && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="aspect-video relative">
              <img
                src={state.processedImage}
                alt="Generated image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Button
            className="w-full"
            variant="outline"
            // onClick={handleDownload}
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            <Download className="mr-2" />
            ダウンロード
          </Button>
        </div>
      )}
    </div>
  );
}
