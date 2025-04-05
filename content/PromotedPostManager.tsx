import React, { useEffect, useRef, useState } from "react";

const isPromoted = (post: HTMLElement): boolean => post.innerText.includes("Promoted");

const getPostId = (post: HTMLElement): string | null => {
  return (
    post.getAttribute("data-id") ||
    post.getAttribute("data-urn") ||
    post.id ||
    post.getAttribute("data-occludable-job-id") ||
    post.innerText.slice(0, 50)
  );
};

const styles: Record<string, React.CSSProperties> = {
  group: {
    display: "inline-flex",
    marginTop: "1rem",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#0a66c2",
    color: "#fff",
    border: "1px solid #0a66c2",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "bold",
    outline: "none",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  leftRounded: {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  },
  rightRounded: {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  popup: {
    position: "fixed",
    backgroundColor: "#0a66c2",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    zIndex: 9999,
    fontSize: "14px",
    whiteSpace: "nowrap",
    color: "#fff",
  },
};

const PromotedPostManager: React.FC = () => {
  const [isHiding, setIsHiding] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [promotedCount, setPromotedCount] = useState(0);
  const [nonPromotedCount, setNonPromotedCount] = useState(0);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const removedIdsRef = useRef<Set<string>>(new Set());
  const groupRef = useRef<HTMLDivElement>(null);

  const updateCounts = () => {
    const posts = document.querySelectorAll<HTMLElement>("div.feed-shared-update-v2");
    let promoted = 0;
    let nonPromoted = 0;
    posts.forEach((post) => {
      if (isPromoted(post)) promoted++;
      else nonPromoted++;
    });
    setPromotedCount(promoted);
    setNonPromotedCount(nonPromoted);
  };

  const removePromotedPosts = () => {
    const posts = document.querySelectorAll<HTMLElement>("div.feed-shared-update-v2");
    posts.forEach((post) => {
      const id = getPostId(post);
      if (id && isPromoted(post) && !removedIdsRef.current.has(id)) {
        removedIdsRef.current.add(id);
        post.style.display = "none";
      }
    });
  };

  const restorePromotedPosts = () => {
    const posts = document.querySelectorAll<HTMLElement>("div.feed-shared-update-v2");
    posts.forEach((post) => {
      const id = getPostId(post);
      if (id && removedIdsRef.current.has(id)) {
        post.style.display = "";
      }
    });
    removedIdsRef.current.clear();
  };

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        if (isHiding) removePromotedPosts();
        updateCounts();
        scrollTimeout = null;
      }, 250);
    };

    window.addEventListener("scroll", onScroll);
    if (isHiding) removePromotedPosts();
    else restorePromotedPosts();
    updateCounts();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHiding]);

  const toggleStatsPopup = () => {
    const show = !showStats;
    setShowStats(show);

    if (show && groupRef.current) {
      const rect = groupRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.top - 80, left: rect.left });
    }
  };

  return (
    <div>
      <div style={styles.group} ref={groupRef}>
        <button
          style={{ ...styles.button, ...styles.leftRounded }}
          onClick={() => setIsHiding((prev) => !prev)}
        >
          {isHiding ? "Show Promoted" : "Hide Promoted"}
        </button>

        <button
          style={{ ...styles.button, ...styles.rightRounded }}
          onClick={toggleStatsPopup}
        >
          ⓘ
        </button>
      </div>

      {showStats && (
        <div
          style={{
            ...styles.popup,
            top: popupPos.top,
            left: popupPos.left,
          }}
        >
          <div>🔍 Promoted Posts: {promotedCount}</div>
          <div>📰 Organic Posts: {nonPromotedCount}</div>
        </div>
      )}
    </div>
  );
};

export default PromotedPostManager;
