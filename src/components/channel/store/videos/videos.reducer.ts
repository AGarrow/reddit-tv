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
      return {
        ...state,
        [action.id]: {
          videos: action.payload.data.children.filter((vid) => vid.data.is_video),
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