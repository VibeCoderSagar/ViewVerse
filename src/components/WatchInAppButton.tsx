"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { APP_WEBSITE_URL, openAppDownloadModal } from "./AppDownloadModal";

interface WatchInAppButtonProps {
  label?: string;
  className?: string;
  showModalOnClick?: boolean;
}

export default function WatchInAppButton({
  label = "Watch in VerseStream App",
  className = "",
  showModalOnClick = false,
}: WatchInAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (showModalOnClick) {
      e.preventDefault();
      openAppDownloadModal();
    }
  };

  return (
    <a
      href={APP_WEBSITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`watch-in-app-btn ${className}`}
      title="Download VerseStream App for 4K streaming without ads"
    >
      <div className="watch-in-app-logo-box">
        <Image
          src="/app-logo.png"
          alt="VerseStream Logo"
          width={22}
          height={22}
          className="watch-in-app-logo"
        />
      </div>
      <span>{label}</span>
      <span className="watch-in-app-tag">FREE</span>
    </a>
  );
}

