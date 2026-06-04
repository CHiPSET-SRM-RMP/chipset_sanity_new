import React from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { galleryQuery } from "@/sanity/lib/queries";

export type Gallery = {
  mainImage: any;
  title: string,
  desc:string,
  slug: string,
  attachment: File,
}

export const metadata = {
  title: "CHiPSET Gallery | Events & Memories",
  description: "Explore photos and memories from CHiPSET events, workshops, hackathons, and celebrations. See our technical community in action at SRM University Ramapuram.",
};

export default async function page() {
  const gallery = await sanityFetch<Gallery[]>({query:galleryQuery});
  const urls: string[] = gallery[0].mainImage.map((item: { url: string; }) => item.url);
  // console.log(urls)
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#f39e2f]">CHiPSET Gallery</h1>
          <p className="text-lg md:text-xl text-slate-200">
            Explore moments from our events, hackathons, workshops, and celebrations that define our technical community.
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 px-4 md:px-12 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Community in Action</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These photos capture the energy, innovation, and camaraderie that defines CHiPSET. From coding competitions to collaborative workshops, see the passion of our members as they push the boundaries of technology.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Events & Activities</h2>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center"><span className="text-[#f39e2f] mr-3">▸</span> Hackathons and coding competitions</li>
                <li className="flex items-center"><span className="text-[#f39e2f] mr-3">▸</span> Technical workshops and seminars</li>
                <li className="flex items-center"><span className="text-[#f39e2f] mr-3">▸</span> Team celebrations and networking events</li>
                <li className="flex items-center"><span className="text-[#f39e2f] mr-3">▸</span> Project showcases and mentorship sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Photo Moments</h2>
          <div className="h-auto">
            <ParallaxScroll className="" images={urls} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-12 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Want to Be Part of Our Story?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join CHiPSET to participate in events, build amazing projects, and create lasting memories with our community. Check back for recruitment announcements!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/events" className="bg-[#f39e2f] text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-600 transition">
              Upcoming Events
            </a>
            <a href="/contact" className="border-2 border-[#f39e2f] text-[#f39e2f] font-semibold py-3 px-8 rounded-lg hover:bg-[#f39e2f] hover:text-white transition">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


