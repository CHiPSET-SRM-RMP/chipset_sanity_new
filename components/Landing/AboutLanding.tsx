"use client";
import React, { useEffect, useRef } from 'react'
import PairSitting from '../Reusable/PairSitting';
import { FaCode, FaLightbulb, FaKeyboard, FaPen, FaRocket, FaGraduationCap } from 'react-icons/fa';

const AboutLanding = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const VIDEO_URL = "https://res.cloudinary.com/ddeqh8bh3/video/upload/v1745241766/Chipset_hero_video_nfeuzq.mp4";
  
  useEffect(() => {
    // Lazy load video on intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Handle autoplay restrictions gracefully
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className='w-full py-16 bg-white text-gray-900 relative overflow-hidden' ref={containerRef}>
      {/* Subtle grid background */}
      <div className='absolute inset-0 opacity-5 bg-[linear-gradient(90deg,transparent_24%,rgba(247,163,57,.1)_25%,rgba(247,163,57,.1)_26%,transparent_27%,transparent_74%,rgba(247,163,57,.1)_75%,rgba(247,163,57,.1)_76%,transparent_77%,transparent),linear-gradient(transparent_24%,rgba(247,163,57,.1)_25%,rgba(247,163,57,.1)_26%,transparent_27%,transparent_74%,rgba(247,163,57,.1)_75%,rgba(247,163,57,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]'></div>

      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10'>
        {/* Top accent */}
        <div className='mb-8 flex items-center gap-3'>
          <div className='h-1 w-12 bg-gradient-to-r from-yellow-500 to-yellow-600'></div>
          <span className='text-sm font-semibold tracking-widest uppercase text-yellow-600'>Discover</span>
        </div>

        {/* Main heading with impact */}
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight' data-aos="fade-up">
            What is <br className='hidden md:block' />
            <span className='bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 bg-clip-text text-transparent'>CH<span className='text-gray-900'>i</span>PSET</span>
          </h1>
          <p className='text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed' data-aos="fade-up" data-aos-delay="100">
            A global collective of innovators, hackers, and problem-solvers transforming ideas into impact.
          </p>
        </div>

        {/* Two column layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Right side - Video (shows first on mobile with order) */}
          <div data-aos="zoom-in" data-aos-delay="200" className='flex items-center justify-center lg:col-span-1 lg:order-last order-first'>
            <div className='w-full relative group'>
              {/* Animated glowing border */}
              <div className='absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500'></div>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500'></div>
              
              {/* Video container */}
              <div className='relative rounded-2xl overflow-hidden border border-gray-300 group-hover:border-yellow-600/50 transition-all duration-300'>
                {VIDEO_URL ? (
                  <video 
                    ref={videoRef}
                    className='w-full h-auto block' 
                    autoPlay
                    muted 
                    loop
                    aria-label="CHIPSET promotional video"
                    playsInline
                  >
                    <source src={VIDEO_URL} type="video/mp4" />
                  </video>
                ) : (
                  <div className='w-full aspect-square flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200'>
                    <PairSitting />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Left side - Content */}
          <div className='space-y-6 lg:order-first order-last'>
            {/* Philosophy statement */}
            <div data-aos="fade-right" className='group'>
              <div className='p-6 rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300'>
                <p className='text-lg md:text-xl font-bold text-gray-900 leading-relaxed'>
                  Progress thrives through <span className='text-yellow-600'>collaboration</span>
                </p>
              </div>
            </div>

            {/* Main description - split into sections */}
            <div className='space-y-5'>
              <div data-aos="fade-right" data-aos-delay="100" className='space-y-2'>
                <h3 className='text-sm font-bold uppercase tracking-wide text-yellow-600'>Our Identity</h3>
                <p className='text-base text-gray-700 leading-relaxed'>
                  CHiPSET unites hackers, innovators, programmers, scriptwriters, entrepreneurs, and technocrats. We&apos;re a non-profit driven by collective passion—catalyzing positive change globally through combined expertise.
                </p>
              </div>

              <div data-aos="fade-right" data-aos-delay="150" className='space-y-2'>
                <h3 className='text-sm font-bold uppercase tracking-wide text-yellow-600'>Our Vision</h3>
                <p className='text-base text-gray-700 leading-relaxed'>
                  We envision a world without boundaries. Where innovation flourishes, barriers dissolve, and every individual potential is fully unleashed. A community of curious minds united by insatiable thirst for knowledge.
                </p>
              </div>

              {/* Collaboration list */}
              <div data-aos="fade-right" data-aos-delay="200" className='pt-2'>
                <h3 className='text-2xl md:text-3xl lg:text-3xl font-black text-yellow-600 mb-6 leading-tight'>
                  Collaboration of
                </h3>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                  {[
                    { name: 'Hackers', icon: FaCode },
                    { name: 'Innovators', icon: FaLightbulb },
                    { name: 'Programmers', icon: FaKeyboard },
                    { name: 'Scriptwriters', icon: FaPen },
                    { name: 'Entrepreneurs', icon: FaRocket },
                    { name: 'Technocrats', icon: FaGraduationCap }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                    <div 
                      key={idx}
                      data-aos="fade-up"
                      data-aos-delay={`${150 + idx * 50}`}
                      className='group p-5 bg-yellow-50 backdrop-blur-md border border-yellow-300 rounded-xl hover:border-yellow-600 hover:bg-yellow-100 transition-all duration-300 flex flex-col items-center justify-center min-h-[110px] cursor-pointer gap-2'
                    >
                      <Icon className='text-2xl text-yellow-600 group-hover:text-yellow-800 group-hover:scale-110 transition-all duration-300' />
                      <p className='text-sm md:text-base lg:text-base font-bold text-yellow-700 text-center group-hover:text-yellow-800 transition-colors duration-300'>{item.name}</p>
                    </div>
                  );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutLanding;