export interface GenerateImageState {
  imageUrl?: string;
  error?: string;
  status: "idle" | "error" | "success";
  keyword?: string; 
}

export interface RemoveBackgroundState {
  originalImage?: string;
  processedImage?: string;
  status: "idle" | "error" | "success";
  error?: string;
}