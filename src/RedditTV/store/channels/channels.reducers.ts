export const channelsReducer = (state, action) => {
  const ids = (channels) => channels != null ? channels.map((ch) => ch.id) : []

  const findIndex = (id) => state.all.findIndex((channel) => channel === id)

  switch (action.type) {
    case 'channels/set/defaults':
      return {
        ...state,
        groups: {
          ...state.groups,
          defaults: {
            name: 'Suggested',
            order: 0,
            channels: action.payload
          }
        },
        all: ids(state.groups?.cookies.channels).concat(ids(action.payload))
      }
    case 'channels/set/cookies':
      return {
        ...state,
        groups: {
          ...state.groups,
          cookies: {
            name: 'My Channels',
            order: 1,
            channels: action.payload
          }
        },
        all: ids(action.payload).concat(ids(state.groups?.defaults.channels))
      }
    case 'channels/select/next':
      const currentIndex = state.index;
      if (currentIndex >= state.all.length - 1) return state;
      return {
        ...state,
        current: state.all[state.index + 1],
        index: state.index + 1
      }
    case 'channels/select/previous':
      if (state.index === 0) return state;
      return {
        ...state,
        current: state.all[state.index - 1],
        index: state.index - 1,
      }
    case 'channels/select/id':
      const index = findIndex(action.id)
      if (index == null) return state;
      return {
        ...state,
        current: action.id,
        index
      }
    case 'channels/select/index':
      return {
        ...state,
        index: findIndex(state.current)
      }
    default:
      return {
        ...state
      }
  }
}