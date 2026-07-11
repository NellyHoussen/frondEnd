import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiTruck,
  FiCompass,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { GiIsland, GiBaobab } from "react-icons/gi";

const madaDestinations = [
  {
    icon: <GiIsland />,
    title: "Escapades côtières",
    desc: "Rejoignez Nosy Be, Sainte-Marie ou les plus belles plages de Madagascar avec un véhicule confortable, fiable et adapté à votre trajet.",
  },
  {
    icon: <FiCompass />,
    title: "Voyages en liberté",
    desc: "Organisez votre itinéraire à votre rythme, sans contrainte. NOMADE vous accompagne pour vos déplacements touristiques, familiaux ou professionnels.",
  },
  {
    icon: <GiBaobab />,
    title: "Routes mythiques",
    desc: "Découvrez l’Allée des Baobabs, la RN7, les hauts plateaux ou les pistes du Sud avec une voiture prête pour l’aventure.",
  },
  {
    icon: <FiTruck />,
    title: "Véhicules adaptés",
    desc: "Citadine, SUV, 4x4 ou van familial : choisissez le modèle qui correspond à votre destination, au nombre de passagers et à votre budget.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.45,
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

function Reserver() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 text-slate-900">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-10 lg:px-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-emerald-700"
          >
            Réserver avec NOMADE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-4xl font-black uppercase leading-tight tracking-wide text-slate-950 md:text-5xl lg:text-6xl"
          >
            Explorez Madagascar avec le véhicule idéal
            <span className="text-amber-500">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600"
          >
            Des rues d’Antananarivo aux routes de l’Île Rouge, choisissez une
            voiture fiable pour voyager librement, confortablement et sans
            perdre de temps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              Location courte durée
            </span>

            <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              4x4 et SUV disponibles
            </span>

            <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              Assistance personnalisée
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55 }}
            onClick={() => setShowMore(!showMore)}
            className="mt-8 flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/25 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            {showMore ? "Masquer les idées de trajet" : "Voir les idées de trajet"}
            {showMore ? <FiChevronUp /> : <FiChevronDown />}
          </motion.button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="overflow-hidden"
              >
                <div className="mt-8 grid gap-4 border-l-4 border-emerald-200 pl-5">
                  {madaDestinations.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      className="flex gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                        {item.icon}
                      </span>

                      <div>
                        <h3 className="text-base font-black uppercase tracking-wide text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.article
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
          className="relative min-h-[520px] overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-900/25"
        >
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt="Road trip à Madagascar avec NOMADE"
            src="/images/reserver.jpg"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-7">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-amber-200">
              <FiMapPin />
              Madagascar
            </div>

            <p className="mt-3 max-w-md text-2xl font-black uppercase leading-tight text-white md:text-3xl">
              Votre route commence avec NOMADE
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export default Reserver;