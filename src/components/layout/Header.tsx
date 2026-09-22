"use client";

import { useState } from "react";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
        }}
      >
        <div
          className="mddl-container"
          style={{
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80">
            <strong
              style={{
                fontSize: "26px",
                letterSpacing: "6px",
              }}
            >
              MDDL
            </strong>
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <a
              href="tel:+880000000000"
              style={{
                fontSize: "12px",
              }}
            >
              CALL US
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                width: "32px",
                height: "32px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "#161616",
                  marginBottom: "6px",
                }}
              />

              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1px",
                  background: "#161616",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}