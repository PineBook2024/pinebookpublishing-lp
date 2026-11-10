import { useEffect, useRef, useState } from "react";

// Keep below-the-fold players out of the initial network and hydration work.
export default function DeferredSection({ children, minHeight = 500 }) {
  const sectionRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={sectionRef} style={{ minHeight }}>{ready ? children : null}</div>;
}
