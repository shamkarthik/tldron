import React, { useEffect, useRef, useState } from "react";

// Helper: Identify promoted post
const isPromoted = (post: HTMLElement): boolean => {
  return post.innerText.includes("Promoted");
};

// Helper: Get a unique ID (or fallback to manually generated)
const getPostId = (post: HTMLElement): string | null => {
  return (
    post.getAttribute("data-id") ||
    post.getAttribute("data-urn") ||
    post.id ||
    post.getAttribute("data-occludable-job-id") || // LinkedIn job post IDs
    post.innerText.slice(0, 50) // crude fallback (not ideal)
  );
};

const PromotedPostManager: React.FC = () => {
  const [isHiding, setIsHiding] = useState(true);
  const removedIdsRef = useRef<Set<string>>(new Set());

  // Remove promoted posts based on ID
  const removePromotedPosts = () => {
    const posts = document.querySelectorAll<HTMLElement>(
      "div.feed-shared-update-v2"
    );
    posts.forEach((post) => {
      const id = getPostId(post);
      if (id && isPromoted(post) && !removedIdsRef.current.has(id)) {
        removedIdsRef.current.add(id);
        post.style.display = "none";
      }
    });
  };

  // Restore hidden posts by ID
  const restorePromotedPosts = () => {
    const posts = document.querySelectorAll<HTMLElement>(
      "div.feed-shared-update-v2"
    );
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
      if (!isHiding) return;
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        removePromotedPosts();
        scrollTimeout = null;
      }, 250);
    };

    window.addEventListener("scroll", onScroll);
    if (isHiding) removePromotedPosts();
    else restorePromotedPosts();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHiding]);

  return (
    <button className="primary-button" onClick={() => setIsHiding((prev) => !prev)}>
      {isHiding ? "Show Promoted Posts" : "Hide Promoted Posts"}
    </button>
  );
};

export default PromotedPostManager;
