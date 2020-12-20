import { createSelector } from 'reselect';
import type { videoType } from '../../../../types';

type videosReturnType = {
  loading: boolean,
  videos: videoType[],
  after: string,
}
export const selectVideos = (state, channelId): videosReturnType => {
  return {
    loading: state.videos[channelId]?.loading,
    videos: state.videos[channelId]?.videos,
    after: state.videos[channelId]?.after
  }
}

type videoReturnType = {
  loading: boolean,
  currentVideo?: videoType,
}

export const selectCurrentVideo = (state, channelId, videoIndex): videoReturnType => {
  const channelVideos = state.videos[channelId]?.videos
  return {
    loading: state.videos[channelId]?.loading,
    currentVideo: channelVideos && channelVideos[videoIndex]
  }
}
