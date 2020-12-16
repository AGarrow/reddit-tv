type mediaAtttributes = {
  fallback_url: string,
  hls_url: string,
  dash_url: string,
  height: number,
  width: number
}
export type videoType = {
  data: {
    secure_media?: {
      reddit_video: {
        mediaAtttributes
      }
    },
    media: {
      mediaAtttributes
    }
    thumbnail: string,
    is_video: boolean
  }
}