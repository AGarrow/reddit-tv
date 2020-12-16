import axios from 'axios';

export const fetchVideos = (channelId) => async (dispatch, getState) => {
  dispatch({ type: 'channel/videos/videosLoading', payload: {}, id: channelId })
  const response = await axios.get(`https://www.reddit.com/r/${channelId}/hot.json`)
  dispatch({ type: 'channel/videos/videosLoaded', payload: response.data, id: channelId })
}