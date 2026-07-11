import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

const CARDS_DATA = [
  {
    title: "Véhicules fiables",
    desc: "Réservez une voiture propre, confortable et prête à prendre la route. NOMADE sélectionne des véhicules adaptés aux déplacements en ville, aux voyages en famille et aux trajets longue distance à Madagascar.",
    bgImage: "/images/Neo.jpg",
  },
  {
    title: "Assistance disponible",
    desc: "Voyagez avec plus de tranquillité grâce à une assistance disponible en cas d’imprévu. Notre équipe vous accompagne avant, pendant et après votre réservation.",
    bgImage: "/images/voyager.jpg",
  },
  {
    title: "Réservation simple",
    desc: "Choisissez votre voiture, indiquez vos dates, puis envoyez votre demande en quelques clics. Une solution rapide et claire pour organiser vos déplacements sans complication.",
    bgImage: "/images/travel.jpg",
  },
  {
    title: "Conducteur flexible",
    desc: "Selon vos besoins, vous pouvez organiser votre location avec ou sans conducteur. Une option pratique pour les voyages professionnels, touristiques ou familiaux.",
    bgImage: "/images/Conducteur.jpg",
  },
  {
    title: "Trajets sur mesure",
    desc: "Départ, retour, durée, destination : adaptez votre réservation à votre programme. NOMADE vous aide à trouver la solution la plus pratique pour votre trajet.",
    bgImage: "/images/vanFamiliale.jpg",
  },
];

function AvantageSlider() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-6 py-16 text-slate-900 md:px-12 lg:px-24">
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
            Pourquoi choisir NOMADE
          </p>

          <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight tracking-wide text-slate-950 md:text-5xl">
            Louez facilement, voyagez sereinement
            <span className="text-amber-500">.</span>
          </h2>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            aria-label="Slide précédent"
            className="avantage-prev flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-700 shadow-sm transition hover:bg-emerald-600 hover:text-white disabled:opacity-40"
          >
            <FiArrowLeft className="text-xl" />
          </button>

          <button
            type="button"
            aria-label="Slide suivant"
            className="avantage-next flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-700 disabled:opacity-40"
          >
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.1}
          navigation={{
            prevEl: ".avantage-prev",
            nextEl: ".avantage-next",
          }}
          breakpoints={{
            480: { slidesPerView: 1.25 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3.6 },
          }}
          className="!overflow-visible"
        >
          {CARDS_DATA.map((card, index) => (
            <SwiperSlide key={card.title} className="group cursor-pointer">
              <article className="relative h-[430px] overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-xl shadow-emerald-900/15">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/5" />

                <div className="absolute inset-0 bg-emerald-600/0 transition duration-300 group-hover:bg-emerald-600/15" />

                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-sm font-black text-amber-200 ring-1 ring-white/20 backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="mb-4 text-2xl font-black uppercase leading-tight tracking-wide text-white">
                      {card.title}
                    </h3>

                    <p className="text-sm font-medium leading-relaxed text-white/90 transition duration-300">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default AvantageSlider;