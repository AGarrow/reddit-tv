type mediaAtttributes = {
  fallback_url: string,
  hls_url: string,
  dash_url: string,
  height: number,
  width: number
}
export type videoType = {
  data: {
    title: string,
    name: string,
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