"use client";

import { Play } from "lucide-react";
import { MONETAG_DIRECT_LINK } from "@/lib/monetag";

export default function AdBanner() {
  const handleAdClick = () => {
    window.open(MONETAG_DIRECT_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="upcoming-ad-banner" onClick={handleAdClick} style={{ cursor: "pointer" }}>
      <div className="ad-content">
        <span className="ad-badge">HOT</span>
        <div className="ad-title-container">
          <span className="ad-movie-tag">Trending Now</span>
          <span className="ad-movie-tag">Exclusive HD Streams</span>
          <span className="ad-movie-tag">Direct Access</span>
        </div>
      </div>
      <button className="ad-btn" type="button">
        <Play size={14} fill="currentColor" />
        Explore
      </button>
    </div>
  );
}
