import Navbar from "@/Components/Navbar/Navbar";

const values = [
  {
    title: "Curated collections",
    description:
      "We organize visuals with a simple, focused browsing experience that keeps the spotlight on the work itself.",
  },
  {
    title: "Clean presentation",
    description:
      "Every gallery page is designed to feel polished, readable, and easy to scan on both desktop and mobile.",
  },
  {
    title: "Fast exploration",
    description:
      "Lightweight UI and straightforward navigation help visitors move through the gallery without friction.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfeff_0%,_#f8fafc_35%,_#ffffff_100%)] px-3 py-4 text-slate-900 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white/80 p-4 sm:p-8 lg:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <Navbar />

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              About us
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                A gallery built to make photography feel premium and simple.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Image Gallery is a clean showcase space for visual collections.
                The goal is not clutter, but focus: strong imagery, intuitive
                navigation, and a modern layout that works across every screen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                ["100%", "Responsive"],
                ["Fast", "Browsing"],
                ["Clean", "Design"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-2xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Our focus
            </p>
            <div className="mt-6 space-y-4">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
