"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Download, ShieldCheck, Zap, Film, ArrowRight, Smartphone, Sparkles } from "lucide-react";

export const APP_WEBSITE_URL = "https://versestreamapp.com/";

// Helper to open modal from anywhere in the app
export function openAppDownloadModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-verse-app-popup"));
  }
}

interface AppDownloadModalProps {
  autoTriggerDelay?: number; // Delay in ms (default: 3500)
}

export default function AppDownloadModal({ autoTriggerDelay = 0 }: AppDownloadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    // Check if user already dismissed recently
    let isDismissed = false;
    try {
      isDismissed =
        sessionStorage.getItem("vs_app_popup_dismissed") === "true" ||
        Boolean(
          localStorage.getItem("vs_app_popup_dismissed_until") &&
            Date.now() < Number(localStorage.getItem("vs_app_popup_dismissed_until"))
        );
    } catch {
      isDismissed = false;
    }

    // Auto-open only if explicit delay > 0 and user has not dismissed
    let timer: NodeJS.Timeout | null = null;
    if (!isDismissed && !hasAutoOpened && autoTriggerDelay > 0) {
      timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
      }, autoTriggerDelay);
    }

    // Listen to custom event for manual opening (from Header, Banner, Floating Button)
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-verse-app-popup", handleOpen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-verse-app-popup", handleOpen);
    };
  }, [autoTriggerDelay, hasAutoOpened]);

  // Handle Close
  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("vs_app_popup_dismissed", "true");
      // Dismiss for 7 days
      localStorage.setItem(
        "vs_app_popup_dismissed_until",
        String(Date.now() + 7 * 24 * 60 * 60 * 1000)
      );
    } catch {
      // ignore
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="app-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
    >
      <div
        className="app-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="app-modal-close"
          onClick={handleClose}
          aria-label="Close download popup"
        >
          <X size={20} />
        </button>

        {/* Ambient Top Glow */}
        <div className="app-modal-ambient-glow" />

        {/* Modal Header */}
        <div className="app-modal-header">
          <div className="app-badge-pill">
            <span className="app-badge-dot" />
            <Sparkles size={13} className="text-accent-cyan" />
            <span>Official Streaming App</span>
          </div>

          <div className="app-modal-logo-wrapper">
            <div className="app-modal-logo-glow" />
            <div className="app-modal-logo-box">
              <Image
                src="/app-logo.png"
                alt="VerseStream App Logo"
                width={72}
                height={72}
                priority
                className="app-modal-logo-img"
              />
            </div>
          </div>

          <h2 id="app-modal-title" className="app-modal-title">
            VerseStream App
          </h2>
          <p className="app-modal-subtitle">
            Watch Unlimited Movies, TV Series & Anime in 4K Ultra HD with <b>Zero Ads</b>!
          </p>
        </div>

        {/* Feature Grid */}
        <div className="app-modal-features">
          <div className="app-feature-item">
            <div className="app-feature-icon-box" style={{ background: "rgba(255, 75, 43, 0.15)", color: "#ff4b2b" }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="app-feature-title">100% Ad-Free</div>
              <div className="app-feature-desc">No annoying redirects or popups</div>
            </div>
          </div>

          <div className="app-feature-item">
            <div className="app-feature-icon-box" style={{ background: "rgba(0, 242, 254, 0.15)", color: "#00f2fe" }}>
              <Zap size={18} />
            </div>
            <div>
              <div className="app-feature-title">Ultra HD 4K</div>
              <div className="app-feature-desc">Crisp streaming with dual audio</div>
            </div>
          </div>

          <div className="app-feature-item">
            <div className="app-feature-icon-box" style={{ background: "rgba(112, 0, 255, 0.15)", color: "#9d4edd" }}>
              <Download size={18} />
            </div>
            <div>
              <div className="app-feature-title">Offline Downloads</div>
              <div className="app-feature-desc">Save movies & watch on the go</div>
            </div>
          </div>

          <div className="app-feature-item">
            <div className="app-feature-icon-box" style={{ background: "rgba(255, 170, 0, 0.15)", color: "#ffaa00" }}>
              <Smartphone size={18} />
            </div>
            <div>
              <div className="app-feature-title">Fast & Smooth</div>
              <div className="app-feature-desc">Mobile & Android TV optimized</div>
            </div>
          </div>
        </div>

        {/* Action Button: Directly links to versestreamapp.com */}
        <div className="app-modal-actions">
          <a
            href={APP_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="app-download-btn-primary"
            onClick={() => {
              // Mark dismissed so it doesn't pop up again
              sessionStorage.setItem("vs_app_popup_dismissed", "true");
            }}
          >
            <div className="app-download-btn-content">
              <Download size={22} className="app-download-icon" />
              <div className="app-download-btn-text">
                <span className="app-download-main-text">Download VerseStream App</span>
                <span className="app-download-sub-text">Visit {APP_WEBSITE_URL.replace("https://", "").replace("/", "")}</span>
              </div>
            </div>
            <ArrowRight size={20} className="app-download-arrow" />
          </a>

          <button
            onClick={handleClose}
            className="app-modal-cancel-btn"
          >
            Continue Watching on Web
          </button>
        </div>

        {/* Footer info */}
        <div className="app-modal-footer">
          <span>✓ Free Download</span>
          <span>•</span>
          <span>✓ Safe & Verified</span>
          <span>•</span>
          <span>✓ Android 7.0+</span>
        </div>
      </div>
    </div>
  );
}

