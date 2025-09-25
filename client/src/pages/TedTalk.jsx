import React from "react";

const TedPlayer = () => {
  // Some TED YouTube video IDs
  const videos = [
    "iG9CE55wbtY", // Sir Ken Robinson
    "Ks-_Mh1QhMc", // Your body language may shape who you are
    "H14bBuluwB8", // The power of introverts
    "qp0HIF3SfI4", // Inside the mind of a master procrastinator
    "iCvmsMzlF7o",
    "Lp7E973zozc",
    "Lp7E973zozc",
    "xp0O2vi8DX4",
    "XbT1mG4z0hA",
  ];

  // Pick a random one on each reload
  const randomIndex = Math.floor(Math.random() * videos.length);
  const videoId = videos[randomIndex];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#000",
      }}
    >
      <iframe
        width="960"
        height="540"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="TED Talk"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
};

export default TedPlayer;
