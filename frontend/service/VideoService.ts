import { VideoMetadata } from "@/utils/VideoType";
import ApiClient from "@/utils/api-client";

ApiClient
export const uploadVideoMetadata = async (videoMetadata: VideoMetadata) => {
  const response = await fetch('/api/video', {
    method: 'POST',
    body: JSON.stringify(videoMetadata)
  });
  return response.json();
}