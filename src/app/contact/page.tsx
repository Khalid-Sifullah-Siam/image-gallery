import Navbar from "@/Components/Navbar/Navbar";

const contactMethods = [
  {
    label: "Email",
    value: "hello@imagegallery.com",
    href: "mailto:hello@imagegallery.com",
  },
  {
    label: "Phone",
    value: "+1 (555) 012-3456",
    href: "tel:+15550123456",
  },
  {
    label: "Location",
    value: "Available worldwide",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fefce8_0%,_#f8fafc_38%,_#ffffff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8 lg:p-10">
        <Navbar />

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Contact us
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Let&apos;s talk about your next gallery or project.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Reach out for collaborations, custom gallery setups, or any
                questions about the site. We reply with clear next steps and a
                simple plan.
              </p>
            </div>

            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {method.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-950">
                      {method.value}
                    </p>
                  </div>
                  <span className="text-2xl text-emerald-600">→</span>
                </a>
              ))}
            </div>
          </div>

          <form className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Your name
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email address
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                Subject
                <input
                  type="text"
                  placeholder="Project inquiry"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Message
                <textarea
                  rows={6}
                  placeholder="Tell us what you need..."
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
                />
              </label>

              <button
                type="button"
                className="mt-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-300"
              >
                Send message
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
