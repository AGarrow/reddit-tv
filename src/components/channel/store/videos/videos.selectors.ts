import { createSelector } from 'reselect';
import type { videoType } from '../../../../types';

type returnType = {
  loading: boolean,
  videos: videoType[]
}
export const selectVideos = (state, channelId): returnType => {
  return {
    loading: state.videos[channelId]?.loading,
    videos: state.videos[channelId]?.videos
  }
}