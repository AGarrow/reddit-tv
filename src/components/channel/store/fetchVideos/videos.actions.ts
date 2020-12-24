import axios from 'axios';

export const fetchVideos = (channelId, after) => async (dispatch, getState) => {
  dispatch({ type: 'channel/videos/videosLoading', payload: {}, id: channelId })
  const response = await axios.get(redditURL(channelId, after))
  dispatch({ type: 'channel/videos/videosLoaded', payload: response.data, id: channelId, after: after })
}

export const setCurrentVideoIndexAction = (channelId, index) => (dispatch, getState) => {
  dispatch({ type: 'channel/videos/setIndex', channelId: channelId, index: index })
}

const redditURL = (channelId, after) => {
  const baseURL = `https://www.reddit.com/r/${channelId}/hot.json`
  if (after == null) {
    return baseURL
  }
  return `${baseURL}?after=${after}`
}

