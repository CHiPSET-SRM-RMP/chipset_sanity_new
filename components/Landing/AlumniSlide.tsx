"use client";

import React from "react";
import Image from "next/image";

const AlumniSlide = () => {
  const companies = [
    { name: "GitHub", logo: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
    { name: "Microsoft", logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png" },
    { name: "Google", logo: "https://cdn-icons-png.flaticon.com/512/2702/2702602.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png" },
    { name: "Infosys", logo: "https://www.liblogo.com/img-logo/in6145i7cd-infosys-logo-infosys-logo-ai-openchain.png" },
    { name: "TCS", logo: "https://images.ctfassets.net/7xz1x21beds9/4cTq1jt8uh8jnBgvWbpKOV/663b48744791bd4e5ca178ae503d4916/Tata_Consultancy_Services_Logo.svg.png?w=1029&h=1029&q=90&fm=png" },
    { name: "Accenture", logo: "https://tse4.mm.bing.net/th/id/OIP.bR9bF8irYBeD2qn67slkkgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Deloitte", logo: "https://www.pngmart.com/files/23/Deloitte-Logo-PNG-Picture.png" },
    { name: "Commonwealth Bank", logo: "https://p7.hiclipart.com/preview/771/643/772/5bbd470f35af3.jpg" },
    { name: "Twilio", logo: "https://w7.pngwing.com/pngs/172/286/png-transparent-twilio-hd-logo.png" },
    { name: "Optum", logo: "https://cdn.freelogovectors.net/wp-content/uploads/2024/03/optum-logo-freelogovectors.net_.png" },
    { name: "Barclays", logo: "https://icons.veryicon.com/png/o/business/bank-logo-collection/barclays-logo.png" },
    { name: "NatWest", logo: "https://tse4.mm.bing.net/th/id/OIP.Jzz33cq7hfaBBKT1RQJBLgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "CME Group", logo: "https://logowik.com/content/uploads/images/cme-group5437.jpg" },
    { name: "Lloyds London", logo: "https://www.vhv.rs/dpng/d/479-4799508_lloyds-london-png-transparent-png.png" },
    { name: "KPMG", logo: "https://w7.pngwing.com/pngs/855/458/png-transparent-kpmg-inversed-logo.png" },
  ];

  // Duplicate array for seamless infinite scroll
  const extendedCompanies = [...companies, ...companies];

  return (
    <div className="w-full bg-gradient-to-r from-white via-gray-50 to-white py-1 md:py-6 overflow-hidden">
      <div className="mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 md:mb-8 tracking-tight">
          Our Alumni Work At
        </h2>

        {/* Moving Container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 md:gap-12 animate-scroll min-w-max">
            {extendedCompanies.map((company, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 hover:border-[#f39e2f] transition-all duration-300 hover:shadow-lg hover:shadow-[#f39e2f]/20 whitespace-nowrap flex-shrink-0 group min-w-fit"
              >
                <div className="relative w-12 md:w-16 h-10 md:h-12 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-[#f39e2f] transition-colors duration-300 text-center">
                  {company.name}
                </span>
              </div>
            ))}
          </div>

          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AlumniSlide;
