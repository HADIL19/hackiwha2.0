import React from 'react';

export function TherapyVideos() {
  const videos = [
    { title: 'Exercice de respiration', url: 'https://www.youtube.com/embed/VID1' },
    { title: 'Relaxation enfant', url: 'https://www.youtube.com/embed/VID2' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vidéos Thérapeutiques</h2>
      <div className="space-y-4">
        {videos.map((video, i) => (
          <div key={i}>
            <h3 className="font-medium">{video.title}</h3>
            <iframe width="100%" height="250" src={video.url} allowFullScreen />
          </div>
        ))}
      </div>
    </div>
  );
}
