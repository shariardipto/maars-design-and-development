"use client";

import Link from "next/link";

type FullscreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Project",
    href: "/projects",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function FullscreenMenu({
  isOpen,
  onClose,
}: FullscreenMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#ff7944",
        display: "grid",
        gridTemplateColumns: "23% 77%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          background:
            "linear-gradient(rgba(0,0,0,.18), rgba(0,0,0,.18)), url('/images/menu/menu-bg.webp') center/cover no-repeat",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "80px 5vw",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          style={{
            position: "absolute",
            right: "50px",
            top: "40px",

            border: 0,
            background: "transparent",

            fontSize: "36px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <nav
          style={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "34px",
          }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                fontSize: "clamp(34px, 3.6vw, 66px)",
                fontWeight: 700,

                color: index === 0 ? "#ffffff" : "#161616",
                lineHeight: 1,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            position: "absolute",
            left: "-10px",
            bottom: "-75px",

            fontSize: "clamp(130px, 18vw, 350px)",
            fontWeight: 900,
            lineHeight: 0.8,

            color: "transparent",
            WebkitTextStroke: "2px rgba(0,0,0,.12)",

            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          MDDL
        </div>
      </div>
    </div>
  );
}