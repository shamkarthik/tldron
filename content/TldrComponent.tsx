import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./TldrComponent.css";
import InjectButton from "./InjectButton";
import { ToastProvider } from "../components/context/ToastContext";
import PromotedPostManager from "./PromotedPostManager";

const injectButtons = () => {
  const containers = Array.from(
    document.getElementsByClassName(
      "feed-shared-update-v2__control-menu-container"
    ) as HTMLCollectionOf<HTMLElement>
  );

  containers.forEach((container) => {
    if (container.querySelector(".injected-button")) return;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "injected-button";

    const root = createRoot(buttonContainer);
    root.render(
      <ToastProvider position="top-right">
        <InjectButton container={container} />
      </ToastProvider>
    );

    container.prepend(buttonContainer);
  });
};

const ejectButtons = () => {
  const injectedButtons = Array.from(
    document.querySelectorAll(".injected-button")
  );
  injectedButtons.forEach((button) => button.remove());
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "fixed",
    zIndex: 9999,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    transition: "opacity 0.3s, transform 0.3s ease",
    padding: "8px",
    borderRadius: "12px",
    // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    // backgroundColor: "#fff",
  },
  assistiveButton: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "white",
    border: "none",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    fontSize: "24px",
    cursor: "move",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    color: "#0073b1",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "14px",
    minWidth: "120px",
    transition: "background-color 0.2s ease",
  },
  expandedContainer: {
    maxHeight: "500px",
    opacity: 1,
    transform: "scale(1)",
  },
  collapsedContainer: {
    maxHeight: 0,
    opacity: 0,
    transform: "scale(0.95)",
    overflow: "hidden",
  },
};

const LinkedInTLDR = () => {
  const [enableExtension, setEnableExtension] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const wasDragging = useRef(false);

  useEffect(() => {
    if (!enableExtension) {
      ejectButtons();
      return;
    }
  }, [enableExtension]);

  useEffect(() => {
    if (!enableExtension) return;
    injectButtons();
    document.addEventListener("scroll", injectButtons);
    return () => document.removeEventListener("scroll", injectButtons);
  }, [enableExtension]);

  // 🖱️ Drag Logic
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      wasDragging.current = true;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setTimeout(() => {
        wasDragging.current = false;
      }, 100);
    };

    const onMouseDown = (e: MouseEvent) => {
      wasDragging.current = false;
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const node = wrapperRef.current;
    node?.addEventListener("mousedown", onMouseDown);
    return () => node?.removeEventListener("mousedown", onMouseDown);
  }, []);

  const toggleExtension = () => {
    setEnableExtension((prev) => !prev);
    setExpanded(false);
  };

  const openSettings = () => {
    chrome.runtime.sendMessage({ action: "openOptionsPage" });
    setExpanded(false);
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        ...styles.wrapper,
        left: position.x,
        top: position.y,
      }}
    >
      <div style={styles.buttonContainer}>
        <button
          style={styles.assistiveButton}
          onClick={() => {
            if (!wasDragging.current) setExpanded((prev) => !prev);
          }}
          title="TL;DR Assistant"
        >
          ⚙️
        </button>

        <div
          style={{
            ...(!expanded
              ? styles.collapsedContainer
              : styles.expandedContainer),
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
            <button className="primary-button" onClick={toggleExtension}>
              {enableExtension ? "Disable" : "Enable"} TL;DR
            </button>
            <button className="primary-button" onClick={openSettings}>
              Open Settings
            </button>
          </div>

          <div style={{ marginTop: "10px", width: "100%" }}>
            <PromotedPostManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInTLDR;
