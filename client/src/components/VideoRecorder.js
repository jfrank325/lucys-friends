import React from 'react';
import { render } from 'react-dom';
import VideoRecorder from 'react-video-recorder';

const Video = () => {
  return (
    <div>
      {' '}
      <VideoRecorder
        onRecordingComplete={(videoBlob) => {
          // console.log('videoBlob', videoBlob);
        }}
      />
    </div>
  );
};

export default Video;
