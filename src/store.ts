import { configureStore } from '@reduxjs/toolkit';

import { videosReducer } from './components/Channel/store/fetchVideos/videos.reducer';

export const store = configureStore({
  reducer: {
    videos: videosReducer
  }
})