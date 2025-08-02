"use client";

import { useEffect, useState } from "react";
import "../styles/loader.css";

export default function CozyCornerLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
          }, 200);
          setTimeout(() => {
            setIsComplete(true);
            document.body.style.overflow = "auto";
          }, 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {!isComplete && (
        <div className={`loader-container ${isFadingOut ? "fade-out" : ""}`}>
          <div className="loader-content">
            <div className="logo-container">
              <div className="coffee-cup">
                <div className="cup-body">
                  <div className="coffee-liquid"></div>
                  <div className="cup-handle"></div>
                </div>
                <div className="steam">
                  <div className="steam-line steam-1"></div>
                  <div className="steam-line steam-2"></div>
                  <div className="steam-line steam-3"></div>
                </div>
              </div>
              <div className="logo-text">
                <span className="cozy">Cozy</span>
                <span className="corner">Corner</span>
              </div>
            </div>

            <div className="loading-text">
              <span className="loading-word">Brewing</span>
              <span className="loading-word">your</span>
              <span className="loading-word">perfect</span>
              <span className="loading-word">experience</span>
              <div className="dots">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-text">{progress}%</div>
            </div>

            <div className="coffee-beans">
              <div className="bean bean-1"></div>
              <div className="bean bean-2"></div>
              <div className="bean bean-3"></div>
              <div className="bean bean-4"></div>
              <div className="bean bean-5"></div>
            </div>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>Welcome to Cozy Corner!</h1>
            <p>Your perfect coffee experience awaits...</p>
          </div>
        </div>
      )}
    </>
  );
}
