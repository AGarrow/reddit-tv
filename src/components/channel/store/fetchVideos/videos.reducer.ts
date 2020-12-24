export const videosReducer = (state, action) => {
  switch (action.type) {
    case 'channel/videos/videosLoading': {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          loading: true
        }
      }
    }
    case 'channel/videos/videosLoaded': {
      const returnedVideos = action.payload.data.children.filter((vid) => vid.data.is_video || vid.data.domain === 'youtube.com')
      const videoList = action.after == null ? returnedVideos : state[action.id].videos.concat(returnedVideos);
      const index = action.after == null ? 0 : state[action.id].currentVideoIndex
      return {
        ...state,
        [action.id]: {
          videos: videoList,
          after: action.payload.data.after,
          loading: false,
          currentVideoIndex: index,
        }
      }
    }
    case 'channel/videos/setIndex': {
      return {
        ...state,
        [action.channelId]: {
          ...state[action.channelId],
          currentVideoIndex: action.index
        }
      }
    }
    default:
      return {
        state
      }
  }
}