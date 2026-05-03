"use client";
import React from 'react'
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Event } from '@/app/page';
import { Calendar, Users, Tag } from 'lucide-react';

const EventCard = ({events}:{events:Event}) => {
  // console.log(events.mainImage)
  
  // Return null if no image
  if (!events.mainImage) {
    return null;
  }

  return (
    <>
    <div data-aos="fade-up">
        <CardContainer className="inter-var">
            <CardBody className="relative group/card w-[220px] sm:w-[240px] md:w-[320px] lg:w-[340px] xl:w-[360px] p-3 sm:p-4 border rounded-2xl transition-all duration-500 will-change-transform backdrop-blur-xl bg-gradient-to-br from-orange-50/50 to-yellow-50/30 dark:from-orange-900/10 dark:to-yellow-900/5 border-orange-200/40 dark:border-orange-400/20 shadow-[0_8px_32px_rgba(243,158,47,0.15)] dark:shadow-[0_8px_32px_rgba(243,158,47,0.2)] group-hover/card:shadow-[0_12px_48px_rgba(243,158,47,0.3)] dark:group-hover/card:shadow-orange-500/[0.25] hover:scale-105 transition-transform">

              <CardItem translateZ="20" className="w-full">
                <CardItem translateZ="20" className="w-full">
                  <div className="relative h-32 sm:h-36 md:h-40 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src={events.mainImage} 
                      height="1000" 
                      width="1000" 
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                      alt={events.title || "thumbnail"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </CardItem>

                {/* Title */}
                <p className='line-clamp-2 my-2 sm:my-2.5 text-sm sm:text-base font-bold text-orange-700 dark:text-orange-300 font-heading'>
                  {events.title}
                </p>
              </CardItem>

              {/* Event Details */}
              <CardItem as="div" translateZ="20" className="space-y-1.5">
                {/* Domain */}
                <div className="flex items-center gap-2">
                  <Tag size={12} className="text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <p className='text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 line-clamp-1'>
                    <span className='font-bold text-orange-600 dark:text-orange-400'>{events.domain}</span>
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <p className='text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 line-clamp-1'>
                    <span className='font-semibold text-gray-900 dark:text-white'>{events.date}</span>
                  </p>
                </div>

                {/* Candidates */}
                <div className="flex items-center gap-2">
                  <Users size={12} className="text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <p className='text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 line-clamp-1'>
                    <span className='font-semibold text-gray-900 dark:text-white'>{events.candidates}+ participants</span>
                  </p>
                </div>
              </CardItem>
            </CardBody>
        </CardContainer>
    </div>
    </>
  )
}

export default EventCard
