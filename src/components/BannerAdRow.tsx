"use client";

export default function BannerAdRow() {
  return (
    <div className="banner-ad-row-container" style={{ display: "flex", justifyContent: "center", gap: "16px", margin: "16px 0" }}>
      {/* Ad 1 (Always visible) */}
      <div className="banner-ad-box">
        <iframe
          src="/ad320x50.html"
          width="320"
          height="50"
          loading="lazy"
          title="Advertisement"
          frameBorder="0"
          scrolling="no"
          style={{ border: "none", overflow: "hidden" }}
        />
      </div>

      {/* Ad 2 (Desktop only, lazy loaded) */}
      <div className="banner-ad-box desktop-only-ad">
        <iframe
          src="/ad320x50.html"
          width="320"
          height="50"
          loading="lazy"
          title="Advertisement"
          frameBorder="0"
          scrolling="no"
          style={{ border: "none", overflow: "hidden" }}
        />
      </div>
    </div>
  );
}
