import { channelGroupType } from "../../../types";

export const selectChannelGroups = (state) => {
  if (state.channels.groups == null) return;
  const groups: channelGroupType[] = Object.values(state.channels.groups)
  return groups.sort((a, b) => a.order > b.order ? -1 : 1)
}

export const isDefaultChannel = (state) => (channelId) => {
  if (state.channels.groups == null) return;
  return !!state.channels.groups.defaults.channels.find((ch) => ch.id === channelId)
}

export const selectCurrentChannelId = (state) => state.channels.current;
