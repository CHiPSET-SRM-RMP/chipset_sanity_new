import Link from "next/link";

export default function ToolsIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Resources</h1>
        <p className="text-slate-600 mb-10 text-sm md:text-base">
          Quick access to helpful tools and articles from CHiPSET.
        </p>
        <div className="space-y-4">
          <Link
            href="/tools/cgpa-calculator"
            className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold text-slate-900">CGPA Calculator</h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Calculate your semester and overall CGPA with ease.
              </p>
            </div>
            <span className="text-xs md:text-sm font-medium text-[#f39e2f]">Open</span>
          </Link>

          <Link
            href="/tools/articles"
            className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:border-[#f39e2f] transition flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold text-slate-900">Tech Articles</h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Explore visual and in-depth technical resources from the community.
              </p>
            </div>
            <span className="text-xs md:text-sm font-medium text-[#f39e2f]">Open</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
