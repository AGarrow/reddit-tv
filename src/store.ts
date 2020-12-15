import { configureStore } from '@reduxjs/toolkit';

import { videosReducer } from './components/channel/store/videos/videos.reducer';

export const store = configureStore({
  reducer: {
    videos: videosReducer
  }
})