import { addChannelToList } from '../../../utils/channels';

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
            allowRemove: false,
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
            allowRemove: true,
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
    case 'channels/add/id':
      const cookieChannels = addChannelToList(state.groups.cookies.channels, { id: action.id }) 
      return {
        ...state,
        groups: {
          ...state.groups,
          cookies: {
            ...state.groups.cookies,
            channels: cookieChannels,
          }
        },
        all: ids(cookieChannels).concat(ids(state.groups?.defaults.channels))
      }
    case 'channels/remove/id':
      return {
        ...state,
        groups: {
          ...state.groups,
          cookies: {
            ...state.groups.cookies,
            channels: state.groups.cookies.channels.filter((ch) => ch.id !== action.id)
          }
        }
      }
    default:
      return {
        ...state
      }
  }
}