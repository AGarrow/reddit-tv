import { DEFAULT_CHANNELS } from './constants'

export const defaultChannels = () => {
  return sortChannels(DEFAULT_CHANNELS)
}

export const sortChannels = (channelList) => {
  return channelList.sort((a, b) => {
    if (a.id < b.id) {
      return -1
    }
    if (a.id > b.id) {
      return 1
    }
    else {
      return 0
    }
  })
}