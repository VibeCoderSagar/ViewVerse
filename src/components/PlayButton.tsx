import Link from "next/link";
import { Play } from "lucide-react";

interface PlayButtonProps {
  movieId: number;
}

export default function PlayButton({ movieId }: PlayButtonProps) {
  return (
    <Link 
      href={`/play/movie/${movieId}`}
      className="btn btn-primary" 
      style={{
        padding: "14px 40px",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
      }}
    >
      <Play size={20} fill="currentColor" />
      Play Now
    </Link>
  );
}
