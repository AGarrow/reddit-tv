import { DEFAULT_CHANNELS } from './constants'
import { channelType } from '../types';


export const addChannelToList = (existingChannels: channelType[], newChannel: channelType) => {
  if (existingChannels == null || existingChannels.length === 0) {
    return [newChannel]
  }
  if (existingChannels.find((ec) => ec.id === newChannel.id)) {
    return existingChannels;
  }
  return(existingChannels.concat(newChannel));
}

export const sortChannels = (channelList) => {
  return channelList.sort((a, b) => {
    return (a.id.toLowerCase() < b.id.toLowerCase() ? -1 : 1)
  })
}

export const defaultChannels = sortChannels(DEFAULT_CHANNELS);
