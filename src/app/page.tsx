import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <h1>MDDL Architecture</h1>
        </section>
      </main>
    </>
  );
}