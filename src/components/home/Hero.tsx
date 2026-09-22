import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "920px",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* LEFT DARK BAR */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "104px",
          height: "100%",
          background: "#3b3b3b",
          zIndex: 1,
        }}
      />

      {/* RIGHT ORANGE BLOCK */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "55.25%",
          right: 0,
          height: "665px",
          background: "#ff7844",
          zIndex: 1,
        }}
      />

      {/* FAINT BACKGROUND TEXT */}
      <div
        style={{
          position: "absolute",
          left: "126px",
          top: "305px",
          zIndex: 2,

          fontSize: "112px",
          fontWeight: 500,
          lineHeight: 1,

          color: "transparent",
          WebkitTextStroke: "1px rgba(20,20,20,0.10)",

          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Living Space.
      </div>

      {/* MAIN HEADING */}
      <div
        style={{
          position: "absolute",
          left: "212px",
          top: "177px",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "72px",
            lineHeight: "1.08",
            letterSpacing: "-3px",
            fontWeight: 700,
            color: "#171717",
          }}
        >
          Architecture{" "}
          <span style={{ color: "#ff7844" }}>and</span>
          <br />

          <span style={{ color: "#ff7844" }}>
            Decor
            <span style={{ color: "#404040" }}>.</span>
          </span>
        </h1>
      </div>

      {/* LEFT IMAGE */}
      <div
        style={{
          position: "absolute",
          left: "88px",
          top: "399px",
          width: "660px",
          height: "320px",
          zIndex: 10,
        }}
      >
        <Image
          src="/images/home/hero-main.webp"
          alt="MDDL architecture project"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* LEFT DESCRIPTION */}
      <div
        style={{
          position: "absolute",
          left: "212px",
          top: "752px",
          width: "505px",
          zIndex: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#939393",
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          MDDL creates thoughtful architectural and interior spaces through
          design, detail and a strong understanding of how people experience
          the built environment.
        </p>

        <Link
          href="/about"
          style={{
            display: "inline-flex",
            marginTop: "32px",

            width: "128px",
            height: "46px",

            alignItems: "center",
            justifyContent: "center",

            background: "#ff7844",
            color: "#ffffff",

            fontSize: "11px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          READ MORE
        </Link>
      </div>

      {/* RIGHT LARGE IMAGE */}
      <div
        style={{
          position: "absolute",
          left: "57%",
          top: "148px",
          width: "31.7%",
          height: "715px",
          zIndex: 10,
        }}
      >
        <Image
          src="/images/home/hero-right.webp"
          alt="MDDL architectural design"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* YEAR */}
      <div
        style={{
          position: "absolute",
          right: "16px",
          top: "158px",
          zIndex: 15,

          fontSize: "13px",
          fontWeight: 500,
          color: "#171717",
        }}
      >
        2026
      </div>

      {/* RIGHT VERTICAL LINE */}
      <div
        style={{
          position: "absolute",
          right: "27px",
          top: "194px",

          width: "1px",
          height: "568px",

          background: "rgba(0,0,0,0.45)",
          zIndex: 15,
        }}
      />

      {/* SOCIAL LINKS */}
      <div
        style={{
          position: "absolute",
          right: "18px",
          top: "775px",

          display: "flex",
          flexDirection: "column",
          gap: "26px",

          zIndex: 15,

          fontSize: "13px",
          fontWeight: 500,
          color: "#171717",
        }}
      >
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
          TW
        </a>

        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
          IG
        </a>

        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
          FB
        </a>

        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
          LN
        </a>
      </div>
    </section>
  );
}