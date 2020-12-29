import { defaultChannels } from "../../../utils"

export const setDefaultChannels = (dispatch) => {
  dispatch({ type: 'channels/set/defaults', payload: defaultChannels})
}

export const setChannelsFromCookies = (channels) => (dispatch) => {
  dispatch({ type: 'channels/set/cookies', payload: channels })
}

export const nextChannel = (dispatch) => {
  dispatch({ type: 'channels/select/next' })
}

export const previousChannel = (dispatch) => {
  dispatch({ type: 'channels/select/previous' })
}

export const setChannelId = (id) => (dispatch) => {
  dispatch({ type: 'channels/select/id', id: id })
}

export const setChannelIndex = (dispatch) => {
  dispatch({ type: 'channels/select/index' })
}