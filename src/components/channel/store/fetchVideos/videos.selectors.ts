import { createSelector } from 'reselect';
import type { videoType } from '../../../../types';

type returnType = {
  loading: boolean,
  videos: videoType[],
  after: string,
}
export const selectVideos = (state, channelId): returnType => {
  return {
    loading: state.videos[channelId]?.loading,
    videos: state.videos[channelId]?.videos,
    after: state.videos[channelId]?.after
  }
}