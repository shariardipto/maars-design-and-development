import Image from "next/image";
import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="relative bg-white py-[120px]">
      <div className="mddl-container grid grid-cols-[38%_62%] items-center">
        {/* LEFT CONTENT */}
        <div className="relative z-10 pl-[5%] pr-[70px]">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-[5px] w-[5px] bg-[#ff7844]" />

            <span className="text-[10px] tracking-[0.08em] text-[#777]">
              About Us
            </span>
          </div>

          <h2 className="max-w-[300px] text-[40px] font-bold leading-[1.05] tracking-[-1.5px]">
            We turn{" "}
            <span className="text-[#ff7844]">ideas into</span>
            <br />
            works of art
          </h2>

          <div className="my-7 h-px w-[48px] bg-[#ff7844]" />

          <p className="max-w-[360px] text-[12px] leading-[1.9] text-[#777]">
            MDDL approaches architecture and interior design through a careful
            balance of function, material, proportion and human experience.
          </p>

          <p className="mt-4 max-w-[360px] text-[12px] leading-[1.9] text-[#777]">
            Every project is shaped by its context, purpose and the people who
            will ultimately live, work and interact within the space.
          </p>

          <Link
            href="/about"
            className="
              mt-8
              inline-flex
              h-[42px]
              items-center
              justify-center
              bg-[#171717]
              px-7
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-white
              transition-colors
              hover:bg-[#ff7844]
            "
          >
            Read More
          </Link>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative h-[500px]">
          <div className="absolute right-[4%] top-0 h-[450px] w-[82%]">
            <Image
              src="/images/home/2024_10_05_11_11_IMG_2082.JPG"
              alt="MDDL interior design"
              fill
              className="object-cover"
            />
          </div>

          {/* ORANGE FLOATING CARD */}
          <div
            className="
              absolute
              bottom-[15px]
              left-[8%]
              z-20
              w-[240px]
              bg-[#ff7844]
              px-7
              py-5
              text-white
            "
          >
            <div className="text-[17px] font-semibold">
              • Beautiful Interior
            </div>

            <button
              type="button"
              className="mt-3 flex items-center gap-3 text-[10px]"
            >
              <span
                className="
                  flex
                  h-[24px]
                  w-[24px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#ff7844]
                "
              >
                ▶
              </span>

              Watch Video
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}