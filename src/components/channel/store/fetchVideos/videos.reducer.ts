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
      const returnedVideos = action.payload.data.children.filter((vid) => vid.data.is_video)
      const videoList = action.after == null ? returnedVideos : state[action.id].videos.concat(returnedVideos);
      
      return {
        ...state,
        [action.id]: {
          videos: videoList,
          after: action.payload.data.after,
          loading: false,
        }
      }
    }
    default:
      return {
        state
      }
  }
}