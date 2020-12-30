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
    permalink: string,
    domain: string,
    secure_media?: {
      reddit_video: mediaAtttributes
      oembed: {
        html: string,
      }
    },
    media: {
      reddit_video: mediaAtttributes
    }
    thumbnail: string,
    is_video: boolean
  }
}

export type channelType = {
  id: string
}

export type channelGroupType = {
  name: string,
  order: number,
  channels: channelType[],
  allowRemove: boolean,
}