import { configureStore } from '@reduxjs/toolkit';

import { videosReducer } from './components/Channel/store/fetchVideos/videos.reducer';
import { channelsReducer } from './RedditTV/store';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    channels: channelsReducer
  }
})