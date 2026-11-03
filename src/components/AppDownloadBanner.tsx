"use client";

import Image from "next/image";
import { Download, ShieldCheck, Zap, ArrowRight, Sparkles, Smartphone } from "lucide-react";
import { APP_WEBSITE_URL, openAppDownloadModal } from "./AppDownloadModal";

interface AppDownloadBannerProps {
  variant?: "featured" | "compact" | "player";
  title?: string;
}

export default function AppDownloadBanner({
  variant = "featured",
  title,
}: AppDownloadBannerProps) {
  if (variant === "compact") {
    return (
      <div className="app-banner-compact">
        <div className="app-banner-compact-left">
          <div className="app-banner-compact-logo-box">
            <Image
              src="/app-logo.png"
              alt="VerseStream App"
              width={48}
              height={48}
              className="app-banner-compact-logo"
            />
          </div>
          <div>
            <div className="app-banner-compact-badge">
              <Sparkles size={12} />
              <span>OFFICIAL APP</span>
            </div>
            <h3 className="app-banner-compact-title">
              {title ? `Watch "${title}" on VerseStream App` : "Watch on VerseStream App"}
            </h3>
            <p className="app-banner-compact-desc">
              Zero pop-ups, ultra-fast 4K buffer & offline downloads.
            </p>
          </div>
        </div>

        <div className="app-banner-compact-actions">
          <button
            onClick={() => openAppDownloadModal()}
            className="app-banner-details-btn"
          >
            App Features
          </button>
          <a
            href={APP_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="app-banner-compact-download-btn"
          >
            <Download size={16} />
            <span>Download App</span>
          </a>
        </div>
      </div>
    );
  }

  if (variant === "player") {
    return (
      <div className="app-banner-player">
        <div className="app-banner-player-info">
          <Image
            src="/app-logo.png"
            alt="VerseStream App"
            width={38}
            height={38}
            className="app-banner-player-logo"
          />
          <div>
            <h4 className="app-banner-player-title">Experiencing buffering or player ads?</h4>
            <p className="app-banner-player-desc">
              Switch to our official VerseStream App for smooth, lag-free 4K streaming!
            </p>
          </div>
        </div>

        <div className="app-banner-player-cta">
          <a
            href={APP_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="app-banner-player-btn"
          >
            <Download size={15} />
            <span>Get App (Free)</span>
          </a>
        </div>
      </div>
    );
  }

  // Default "featured" banner for Home page
  return (
    <section className="app-banner-featured">
      <div className="app-banner-featured-glow" />
      <div className="app-banner-featured-inner">
        <div className="app-banner-featured-content">
          <div className="app-badge-pill">
            <span className="app-badge-dot" />
            <Smartphone size={13} className="text-accent-cyan" />
            <span>Introducing VerseStream for Android</span>
          </div>

          <h2 className="app-banner-featured-title">
            Take Your Cinema Anywhere with the <span className="app-banner-highlight">VerseStream App</span>
          </h2>

          <p className="app-banner-featured-desc">
            Stream trending movies, full web series & anime with zero ads, ultra-fast 4K servers, and offline download support.
          </p>

          <div className="app-banner-featured-perks">
            <span className="app-perk-item">
              <ShieldCheck size={16} className="text-emerald-400" />
              100% Ad-Free Playback
            </span>
            <span className="app-perk-item">
              <Zap size={16} className="text-amber-400" />
              4K Ultra HD & 60FPS
            </span>
            <span className="app-perk-item">
              <Download size={16} className="text-cyan-400" />
              One-Click Offline Mode
            </span>
          </div>

          <div className="app-banner-featured-buttons">
            <a
              href={APP_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-download-btn-primary"
              style={{ maxWidth: "320px" }}
            >
              <div className="app-download-btn-content">
                <Download size={20} className="app-download-icon" />
                <div className="app-download-btn-text">
                  <span className="app-download-main-text">Download App Now</span>
                  <span className="app-download-sub-text">Visit versestreamapp.com</span>
                </div>
              </div>
              <ArrowRight size={18} className="app-download-arrow" />
            </a>

            <button
              onClick={() => openAppDownloadModal()}
              className="app-banner-secondary-btn"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="app-banner-featured-visual">
          <div className="app-banner-logo-container">
            <div className="app-banner-logo-pulse" />
            <Image
              src="/app-logo.png"
              alt="VerseStream Official App"
              width={140}
              height={140}
              priority
              className="app-banner-featured-logo"
            />
          </div>
          <div className="app-banner-stats-badge">
            <span className="app-stats-rate">★ 4.9</span>
            <span className="app-stats-text">Top Rated Streaming App</span>
          </div>
        </div>
      </div>
    </section>
  );
}

