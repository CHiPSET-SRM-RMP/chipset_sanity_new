"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const POSTER_SRC = "/assets/vibex.jpg";
const EVENT_URL = "https://www.texus.io/event/2502";

export default function VibexPoster() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6">
      <div className="relative flex w-full max-w-[90vw] items-center justify-center">
        <button
          aria-label="Close Vibex poster"
          className="absolute -right-4 -top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-black shadow-lg transition hover:bg-white"
          onClick={() => setVisible(false)}
        >
          Close
        </button>
        <div className="flex w-full max-w-[90vw] flex-col items-center gap-4">
          <Link
            href={EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-auto w-full max-h-[80vh] rounded-3xl border border-transparent"
          >
            <Image
              src={POSTER_SRC}
              alt="Vibex poster"
              width={900}
              height={1200}
              priority
              className="h-auto w-full max-h-[80vh] rounded-3xl border border-white/20 object-contain shadow-2xl transition hover:scale-[1.01]"
            />
          </Link>
          <p className="text-center text-sm font-medium uppercase tracking-wide text-white/80">
            For any queries contact K S Chakradhar Danesh · 9710717142
          </p>
        </div>
      </div>
    </div>
  );
}
