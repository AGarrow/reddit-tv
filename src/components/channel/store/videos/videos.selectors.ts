import { createSelector } from 'reselect';

export const selectVideos = (state, channelId) => {
  return (state.videos[channelId]?.videos)
}