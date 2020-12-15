import axios from 'axios';

export const fetchVideos = (channelId) => async (dispatch, getState) => {
  const response = await axios.get(`https://www.reddit.com/r/${channelId}/hot.json`)
  const action = dispatch({ type: 'channel/videos/videosLoaded', payload: response.data, id: channelId })
}