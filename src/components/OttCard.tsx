"use client";

import Link from "next/link";
import { triggerMonetagPopunder } from "@/lib/monetag";
import { getImageUrl } from "@/lib/tmdb";

interface OttCardProps {
  provider: {
    id: number;
    name: string;
    logo: string;
    brandColor: string;
  };
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export default function OttCard({ provider, style, imgStyle }: OttCardProps) {
  return (
    <Link
      href={`/provider/${provider.id}`}
      onClick={() => triggerMonetagPopunder()}
      className="ott-card"
      style={{
        "--hover-glow": provider.brandColor,
        ...style,
      } as React.CSSProperties}
      draggable={false}
    >
      <img
        src={getImageUrl(provider.logo, "w200")}
        alt={provider.name}
        className="ott-logo-img"
        style={imgStyle}
        draggable={false}
      />
      <span className="ott-card-name">{provider.name}</span>
    </Link>
  );
}
