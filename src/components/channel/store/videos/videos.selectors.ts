import { createSelector } from 'reselect';

export const selectVideos = (state, channelId) => {
  return {
    loading: state.videos[channelId]?.loading,
    videos: state.videos[channelId]?.videos
  }
}