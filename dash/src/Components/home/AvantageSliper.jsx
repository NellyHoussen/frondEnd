import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const CARDS_DATA = [
  {
    title: "Une voiture neuve",
    desc: "Un véhicule neuf, sorti d'usine, à votre nom et qui n'attend que vous. Vous avez la possibilité de choisir le modèle, ainsi que la motorisation et la transmission (manuelle, automatique, 4x4) à votre goût.",
    bgImage: "/images/Neo.jpg"
  },
  {
    title: "Une assistance 24H/24 et 7J/7",
    desc: "Partez l'esprit tranquille. Vous bénéficiez d'une couverture complète avec assistance zéro kilomètre disponible à tout moment, de jour comme de nuit, partout en Europe pour pallier le moindre imprévu.",
    bgImage: "/images/voyager.jpg"
  },
  {
    title: "Une livraison sur mesure",
    desc: "Choisissez le lieu de prise en charge idéal parmi nos nombreux centres de livraison. Votre véhicule sera rigoureusement préparé et disponible dès votre arrivée pour commencer votre trajet sans attente.",
    bgImage: "/images/travel.jpg"
  },
  {
    title: "Conducteur additionnel sans surcoût",
    desc: "Partagez le plaisir de conduire tout au long de votre voyage. Ajoutez gratuitement autant de conducteurs que nécessaire sur votre contrat tout en profitant des mêmes garanties d'assurance.",
    bgImage: "/images/Conducteurjpg"
  },
  {
    title: "Changement centre de restitution simple appel",
    desc: "Vos projets changent en cours de route ? Modifiez votre lieu de restitution d'un simple coup de téléphone. Profitez d'une flexibilité maximale pour réorganiser votre voyage sans stress.",
    bgImage: "/images/vanFamiliale.jpg"
  }
];

function AvantageSliper() {
  return (
    <div className="bg-black text-white py-16 px-6 md:px-12 lg:px-24 font-sans select-none overflow-hidden">

      {/* --- EN-TÊTE : Titre + Boutons --- */}
      <div className="flex items-center justify-between mb-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight flex items-baseline">
          Les avantages T&apos;T Eurodrive
          <span className="text-orange-600 ml-1 text-4xl">.</span>
        </h2>

        {/* Vos flèches de navigation personnalisées */}
        <div className="flex gap-3 shrink-0 z-20">
          <button
            type="button"
            aria-label="Slide précédent"
            className="avantage-prev w-12 h-12 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center transition disabled:opacity-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Slide suivant"
            className="avantage-next w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition disabled:opacity-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- CARROUSEL --- */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.15}
          navigation={{
            prevEl: '.avantage-prev',
            nextEl: '.avantage-next',
          }}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.2 },
          }}
          className="w-full h-[480px] !overflow-visible"
        >
          {CARDS_DATA.map((card) => {
            const lastSpaceIndex = card.title.lastIndexOf(' ');
            const titleFirst = card.title.substring(0, lastSpaceIndex);
            const titleHighlight = card.title.substring(lastSpaceIndex + 1);

            return (
              <SwiperSlide key={card.title} className="cursor-pointer group">
                <div className="relative w-full h-full overflow-hidden bg-neutral-900 border border-neutral-800 rounded-sm">

                  
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${card.bgImage})` }}
                  />

                 
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 transition-opacity duration-300 group-hover:opacity-40" />

                  {/* Calque Orange fusion au hover */}
                  <div className="absolute inset-0 bg-orange-600 mix-blend-multiply opacity-0 transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Contenu textuel */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-start z-10 select-text">
                    <h3 className="text-2xl font-black font-sans tracking-wide leading-tight mb-4 text-white uppercase">
                      {titleFirst}{' '}
                      <span className="text-orange-500 transition-colors duration-300 group-hover:text-black">
                        {titleHighlight}
                      </span>
                    </h3>

                    <p className="text-sm leading-relaxed text-neutral-200 opacity-0 transform translate-y-3 transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0 delay-75 group-hover:text-white font-medium">
                      {card.desc}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

    </div>
  );
}

export default AvantageSliper;