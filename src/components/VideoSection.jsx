import React from 'react';

const VideoSection = ({ courseData }) => {
  const embedUrl = `https://www.youtube.com/embed/${courseData.videoId}`;

  return (
    <div className="content-section my-4 text-center">
      <h3>{courseData.title}</h3>
      <div className="ratio ratio-16x9 w-75 h-75 mx-auto">
        <iframe
          id="videoIframe"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="mt-3">
        <h5>Transcript</h5>
        <p id="videoTranscript" className="text-start px-3">{courseData.transcript}</p>
      </div>
    </div>
  );
};

export default VideoSection;
