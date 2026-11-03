"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { APP_WEBSITE_URL, openAppDownloadModal } from "./AppDownloadModal";

export default function AppFloatingButton() {
  const handleClick = (e: React.MouseEvent) => {
    // If user clicks, open modal for high conversion or let them visit directly
    // Let's open the modal so they see the full attractive offer and features!
    e.preventDefault();
    openAppDownloadModal();
  };

  return (
    <aside aria-label="VerseStream App Download">
      <a
        href={APP_WEBSITE_URL}
        onClick={handleClick}
        className="app-floating-btn"
        aria-label="Download VerseStream App"
        title="Download VerseStream App - Free 4K Movies & Shows"
      >
        <div className="app-floating-logo-wrapper">
          <Image
            src="/app-logo.png"
            alt="VerseStream"
            width={24}
            height={24}
            className="app-floating-logo"
          />
        </div>
        <div className="app-floating-text-container">
          <span className="app-floating-btn-text">Download</span>
          <span className="app-floating-btn-subtext">App</span>
        </div>
        <span className="app-floating-badge">4K</span>
      </a>
    </aside>
  );
}

