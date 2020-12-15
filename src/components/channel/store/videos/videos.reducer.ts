const initialState = { }
export const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'channel/videos/videosLoaded': {
      return {
        ...state,
        [action.id]: {
          videos: action.payload.data.children,
          after: action.payload.data.after
        }
      }
    }
    default:
      return state
  }
}