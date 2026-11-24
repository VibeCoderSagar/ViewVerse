"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const CLARITY_PROJECT_ID = "z4fa523ah3";

function ClarityTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.clarity === "function") {
      const fullUrl = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // Track SPA pageview in Microsoft Clarity for Next.js App Router
      window.clarity("set", "page", fullUrl);
      window.clarity("event", "pageview");
    }
  }, [pathname, searchParams]);

  return null;
}

export default function ClarityAnalytics() {
  return (
    <>
      {/* Microsoft Clarity Script */}
      <Script id="clarity-script" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
      </Script>

      {/* SPA Route Change Pageview Tracker */}
      <Suspense fallback={null}>
        <ClarityTracker />
      </Suspense>
    </>
  );
}
