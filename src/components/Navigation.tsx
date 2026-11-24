"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Film, Tv, Sparkles, Search, Download } from "lucide-react";
import { APP_WEBSITE_URL } from "./AppDownloadModal";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movies", href: "/movies", icon: Film },
  { name: "TV Shows", href: "/tv-shows", icon: Tv },
  { name: "Anime", href: "/anime", icon: Sparkles },
  { name: "Search", href: "/search", icon: Search },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Safe navigation handler to ensure no ad scripts intercept tab clicks
  const handleNavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Mobile Sticky Header */}
      <header className="mobile-header">
        <Link
          href="/"
          className="mobile-logo"
          onClick={handleNavClick}
          data-no-ad="true"
        >
          ViewVerse
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href={APP_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-header-app-btn"
            title="Download VerseStream App"
            onClick={handleNavClick}
          >
            <Image
              src="/app-logo.png"
              alt="VerseStream"
              width={18}
              height={18}
              style={{ borderRadius: "5px", flexShrink: 0 }}
            />
            <span>Get App</span>
          </a>
          <Link
            href="/search"
            aria-label="Search"
            onClick={handleNavClick}
            data-no-ad="true"
          >
            <Search size={22} className="text-secondary" />
          </Link>
        </div>
      </header>

      {/* Desktop Glass Sidebar */}
      <aside className="sidebar-desktop">
        <Link
          href="/"
          className="sidebar-logo"
          onClick={handleNavClick}
          data-no-ad="true"
        >
          <Film size={28} className="text-accent-cyan" style={{ color: "#00f2fe" }} />
          <span>ViewVerse</span>
        </Link>

        <nav style={{ flex: 1 }}>
          <ul className="sidebar-menu">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li
                  key={item.href}
                  className={`sidebar-item ${active ? "active" : ""}`}
                >
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    data-no-ad="true"
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* VerseStream App Sidebar Promo Card */}
        <div className="sidebar-app-promo">
          <div className="sidebar-app-promo-header">
            <div className="sidebar-app-promo-img-wrapper">
              <Image
                src="/app-logo.png"
                alt="VerseStream App"
                width={36}
                height={36}
                style={{ borderRadius: "8px" }}
              />
            </div>
            <div className="sidebar-app-promo-text">
              <span className="sidebar-app-promo-title">VerseStream</span>
              <span className="sidebar-app-promo-tag">4K Ad-Free App</span>
            </div>
          </div>
          <a
            href={APP_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-app-promo-btn"
            onClick={handleNavClick}
          >
            <Download size={15} />
            <span>Download App</span>
          </a>
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "12px" }}>
          © 2026 ViewVerse
        </div>
      </aside>

      {/* Mobile Sticky Bottom Nav */}
      <nav className="mobile-nav">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              data-no-ad="true"
              className={`mobile-nav-item ${active ? "active" : ""}`}
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
