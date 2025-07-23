/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { generateImage } from "@/actions/actions";
import { GenerateImageState } from "@/types/actions";
import { Download, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { toast } from "sonner";

const initialState: GenerateImageState = {
  status: "idle",
};

export default function ImageGenerator() {
  const [state, formAction, isPending] = useActionState(
    generateImage,
    initialState
  );

  const handleDownload = () => {
    if (!state.imageUrl) return;

    try {
      const base64Data = state.imageUrl.split(",")[1];
      const blob = new Blob([Buffer.from(base64Data, "base64")], {
        type: "image/png",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${state.keyword}.png`;

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
            <Label htmlFor="keyword">キーワード</Label>
            <Input
              id="keyword"
              name="keyword"
              placeholder="作成したい画像のキーワードを入力(例: 海、山、都会、自然)"
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
                <ImageIcon className="mr-2" /> 画像を生成する
              </>
            )}
          </Button>
        </form>
      </div>

      {/* image preview */}
      {/* state.imageUrlとは画像が存在するときだけ表示させるロジック */}
      {state.imageUrl && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="aspect-video relative">
              <img
                src={state.imageUrl}
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
