"use client";

import { OTT_PROVIDERS } from "@/lib/tmdb";
import OttCard from "@/components/OttCard";

export default function ProvidersPage() {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>Explore OTT Platforms</h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Browse movies, TV shows, and anime across your favorite streaming services
        </p>
      </div>

      <div className="providers-grid">
        {OTT_PROVIDERS.map((prov) => (
          <OttCard
            key={prov.id}
            provider={prov}
            style={{ width: "100%", height: "140px" }}
            imgStyle={{ width: "64px", height: "64px" }}
          />
        ))}
      </div>
    </div>
  );
}
