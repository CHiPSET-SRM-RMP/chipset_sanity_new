'use client';
import React from 'react';
import Image from 'next/image';
import { AiFillLinkedin } from 'react-icons/ai';

type Team = {
  name: string;
  batch: string;
  img: string;
  role: string;
  linkedin: string;
};

const Team_Profile: React.FC<Team> = ({ name, batch, img, role, linkedin }) => {
  const shortRole = role?.split(' ')[0] || 'Lead';
  return (
    <>
      <div
        className="group relative mx-auto sm:mx-2 my-2 flex-none h-full w-full max-w-[180px] sm:max-w-[190px] overflow-visible rounded-[22px] bg-gradient-to-br from-[#fce9d6] via-[#e7f2ff] to-white p-[1px] shadow-lg shadow-[#f39e2f]/50 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[#3b82f6]/40"
        style={{
          animation: 'lanyard-sway 8s ease-in-out infinite',
          transformOrigin: '50% -120px',
          willChange: 'transform'
        }}
      >
        {/* Lanyard straps and clip (visible) */}
        <div className="pointer-events-none absolute left-1/2 -top-12 h-20 w-[7px] -translate-x-[53%] -rotate-[11deg] rounded-full bg-gradient-to-b from-[#f7c14a] via-[#f5b11f] to-[#f39e2f] shadow-lg shadow-black/10 opacity-90" />
        <div className="pointer-events-none absolute left-1/2 -top-12 h-20 w-[7px] -translate-x-[57%] rotate-[11deg] rounded-full bg-gradient-to-b from-black via-[#111827] to-[#1f2937] shadow-lg shadow-black/15 opacity-85" />
        <div className="pointer-events-none absolute left-1/2 -top-3 h-3 w-12 -translate-x-1/2 rounded-md bg-gradient-to-r from-slate-300 via-slate-50 to-slate-200 shadow ring-1 ring-slate-200/80" />
        <div className="pointer-events-none absolute left-1/2 -top-1 h-3 w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-100 via-white to-slate-100 ring-1 ring-amber-100 shadow-sm" />
        <div className="pointer-events-none absolute left-1/2 top-1.5 h-2 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow ring-1 ring-slate-200/80 z-20" />
        <div className="pointer-events-none absolute left-1/2 top-3 h-1.5 w-5 -translate-x-1/2 rounded-full bg-slate-100 ring-1 ring-slate-200/80 z-30" />
        <div className="pointer-events-none absolute left-1/2 top-5 h-10 w-28 -translate-x-1/2 rounded-xl bg-gradient-to-b from-[#fde68a] via-[#fbbf24] to-[#f59e0b] shadow-lg shadow-[#f59e0b]/50 ring-1 ring-[#f59e0b]/70 z-10 flex flex-col items-center justify-center gap-0.5 text-black">
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">Chipset</span>
          <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-black ring-1 ring-[#f59e0b]/60">{shortRole}</span>
        </div>
        <div className="pointer-events-none absolute inset-x-6 top-0 h-6 rounded-b-full bg-gradient-to-r from-amber-300 via-rose-200 to-amber-300 blur-sm opacity-60" />
        <div className="pointer-events-none absolute inset-x-4 bottom-3 h-16 rounded-[22px] bg-gradient-to-r from-amber-300/55 via-rose-200/50 to-[#0A66C2]/35 blur-[8px]" />
        {/* Single SRM watermark (diagonal) */}
        <div className="pointer-events-none absolute inset-0 z-[30] flex items-center justify-start pl-0">
          <span className="ml-[-60px] text-[68px] font-black leading-none tracking-[0.08em] text-black/10 rotate-[-90deg]">
            SRM
          </span>
        </div>
        {/* SRM seal top-right */}
        <div className="pointer-events-none absolute right-2 top-6 z-[30]">
          <Image
            src="/assets/srm-seal.png"
            alt="SRM seal"
            width={36}
            height={36}
            className="h-9 w-9 object-contain opacity-[0.8] drop-shadow-sm"
          />
        </div>
        {/* Subtle SRM Logo in Left Bottom Corner */}
        <div className="pointer-events-none absolute left-2 bottom-2 z-[30]">
          <Image
            src="/assets/srm-seal.png"
            alt="SRM seal"
            width={35}
            height={35}
            className="h-7 w-auto object-contain opacity-[0.22]"
          />
        </div>
        <div className="absolute left-1/2 top-5 -translate-x-1/2 z-20">
          <Image
            src="/assets/logo/5CHiPSET_black.png"
            alt="Chipset logo"
            width={60}
            height={60}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full flex-col gap-2 rounded-[16px] bg-white/95 px-3 pt-10 pb-3 backdrop-blur-sm ring-1 ring-amber-100" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <div className="relative h-20 w-14 rounded-md bg-white shadow-lg shadow-slate-200/80 ring-2 ring-amber-200/80 transition duration-300 group-hover:shadow-xl group-hover:shadow-amber-200/60">
                <Image
                  src={img}
                  alt={name}
                  height={80}
                  width={56}
                  className="h-20 w-14 rounded-md object-cover object-top"
                />
              </div>
            </div>

            <div className="flex-1 space-y-0">
              <p className="inline-flex items-center rounded-full bg-amber-50 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-amber-700 ring-1 ring-amber-200/80">
                {batch}
              </p>
              <h3 className="text-sm font-semibold leading-tight text-slate-900 line-clamp-2">{name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-[auto,1fr] gap-x-1.5 gap-y-1 text-xs text-slate-600">
            <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-700">Role</span>
            <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-800 ring-1 ring-amber-50">{role}</span>
            {batch && (
              <>
                <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-700">Team</span>
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-800 ring-1 ring-amber-50">{batch}</span>
              </>
            )}
          </div>

          <div className="flex flex-col items-start gap-1.5 pt-1 sm:flex-row sm:items-center sm:justify-end">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#0A66C2] to-[#0f7de2] px-2.5 py-1 text-[10px] font-semibold text-white shadow-md shadow-[#0A66C2]/30 transition hover:-translate-y-[1px] hover:shadow-[#0f7de2]/50"
                aria-label="Connect on LinkedIn"
              >
                <AiFillLinkedin size={14} color="#fff" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
          <div className="pointer-events-none mt-0 h-1 w-full rounded-full bg-gradient-to-r from-amber-200/70 via-white to-rose-200/70 blur-sm" />
        </div>
      </div>
      <style jsx>{`
        @keyframes lanyard-sway {
          0% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-1.2deg) translateY(1px); }
          50% { transform: rotate(1.4deg) translateY(-1px); }
          75% { transform: rotate(-1deg) translateY(1px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Team_Profile;