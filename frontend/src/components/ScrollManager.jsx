import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function resetScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  // When pathname, search, or key changes (like clicking any navbar link), reset to top
  useLayoutEffect(() => {
    if (!location.hash) {
      resetScrollPosition();
    }
  }, [location.pathname, location.search, location.hash, location.key]);

  // Handle hash links or fallback
  useEffect(() => {
    if (!location.hash) {
      resetScrollPosition();
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!target) {
        resetScrollPosition();
        return;
      }

      const headerOffset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top: Math.max(0, top),
        left: 0,
        behavior: "smooth",
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash, location.key, navigationType]);

  return null;
}
