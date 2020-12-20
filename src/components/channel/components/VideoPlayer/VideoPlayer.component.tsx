import React, { useEffect, useRef } from 'react';
import type { videoType } from '../../../../types';
import { defaultChannels } from '../../../../utils';
import { RedditVideoPlayer, YoutubeVideoPlayer } from './components';

type VideoPlayerProps = {
  video?: videoType,
  loading: boolean,
  onEnded: () => void,
}

export const VideoPlayer = ({ video, loading, onEnded }: VideoPlayerProps) => {
  if (loading || video == null) {
    return <div className="videoPlayer"> loading ... </div>
  }

  const videoData = video?.data;
  const domain = videoData?.domain
  let videoSource;

  switch (domain) {
    case "v.redd.it":
      videoSource = videoData.secure_media.reddit_video.fallback_url;
      return <RedditVideoPlayer videoSource={videoSource} onEnded={onEnded} /> 
    case "youtube.com":
      videoSource = videoData.secure_media.oembed.html.match(/src="(.*)"/)[1]
      return <YoutubeVideoPlayer videoSource={videoSource} onEnded={onEnded} />
    default:
      console.log(videoData);
      return null;
  }
}