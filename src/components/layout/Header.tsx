"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
          style={{
            height: "110px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "7vw",
            paddingRight: "6.5vw",
          }}
        >
          {/* LOGO */}
          <Link href="/">
            <Image
              src="/branding/logo.png"
              alt="MDDL Logo"
              width={150}
              height={60}
              priority
              style={{
                width: "150px",
                height: "auto",
              }}
            />
          </Link>

          {/* RIGHT SIDE */}
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
                color: "#161616",
                textDecoration: "none",
              }}
            >
              CALL US
            </a>

            {/* MENU BUTTON */}
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

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
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