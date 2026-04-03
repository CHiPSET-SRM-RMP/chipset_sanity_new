import React, { Suspense } from "react";
import PageLoader from "@/components/Reusable/PageLoader";
import TicketCard from "@/components/Reusable/Ticket-card";
import { Form } from "@/components/Contact/Form";

export const metadata = {
  title: "Contact CHiPSET | Get in Touch",
  description: "Have questions about CHiPSET? Reach out to us for partnerships, event inquiries, or general questions about our technical community at SRM University Ramapuram.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#f39e2f]">Get in Touch</h1>
            <p className="text-lg md:text-xl text-slate-200">
              Have a question, partnership opportunity, or want to collaborate with CHiPSET? We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 px-4 md:px-12 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Contact CHiPSET?</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-[#f39e2f] mb-2">Partnerships & Collaborations</h3>
                  <p>Interested in partnering with our technical community? We welcome collaborations for events, workshops, and projects.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f39e2f] mb-2">Event Inquiries</h3>
                  <p>Want to sponsor or participate in CHiPSET events? Reach out to learn about upcoming opportunities.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f39e2f] mb-2">Feedback & Suggestions</h3>
                  <p>Your feedback helps us improve. Share your thoughts about our events, content, and community.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f39e2f] mb-2">General Questions</h3>
                  <p>Have any questions about CHiPSET? Our team is ready to help with any inquiries.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Info</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Organization</h3>
                  <p className="text-gray-700">CHiPSET - SRM University Ramapuram</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
                  <p className="text-gray-700">SRM University, Ramapuram Campus<br />Chennai, India</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Follow Us</h3>
                  <p className="text-gray-700 mb-3">Connect with us on social media for updates and announcements:</p>
                  <a
                    href="https://www.instagram.com/chipsetsrmrmp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#f39e2f] text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition"
                  >
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4 md:px-12 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Send us a Message</h2>
            <div className="max-w-2xl mx-auto">
              <Form />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-12 bg-slate-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore CHiPSET Further</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Discover our events, team, and technical resources. Learn more about what we do and how you can be part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/events" className="bg-[#f39e2f] text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-600 transition">
                View Events
              </a>
              <a href="/team" className="border-2 border-[#f39e2f] text-[#f39e2f] font-semibold py-3 px-8 rounded-lg hover:bg-[#f39e2f] hover:text-white transition">
                Meet the Team
              </a>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
