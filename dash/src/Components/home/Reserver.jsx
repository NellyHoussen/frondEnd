import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Données de description sur les vacances à Madagascar
const madaDestinations = [
  {
    icon: "🏖️",
    title: "Plages paradisiaques",
    desc: "Détendez-vous sur le sable blanc immaculé de Nosy Be ou de l'Île Sainte-Marie avec un véhicule tout confort."
  },
  {
    icon: "🐒",
    title: "Faune endémique",
    desc: "Explorez le parc national d'Andasibe. Roulez à votre rythme pour aller à la rencontre des célèbres lémuriens."
  },
  {
    icon: "🌳",
    title: "L'Allée des Baobabs",
    desc: "Prenez le volant vers Morondava pour admirer des couchers de soleil inoubliables au milieu des géants de la nature."
  },
  {
    icon: "🚙",
    title: "Aventure sur la RN7",
    desc: "Louez le 4x4 parfait pour traverser les hauts plateaux et découvrir l'âme de l'Île Rouge en toute liberté."
  }
];

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.8,
      staggerChildren: 0.6, // Délai de 0.6s entre l'apparition de chaque texte
      delayChildren: 0.3,
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      staggerDirection: -1 // Disparition dans le sens inverse
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: "easeOut" } // Transition douce pour chaque texte
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

function Reserver() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col items-start justify-between gap-12 p-8 md:flex-row max-w-7xl mx-auto bg-white min-h-screen pt-20">
      <div className="flex-1 flex flex-col justify-start">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl mb-6 leading-tight"
        >
          ÉVADEZ-VOUS À <span className="text-emerald-600">MADAGASCAR</span> AVEC TO LOGO
        </motion.h1>

       
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-xl text-slate-600 mb-8"
        >
          Explorez les merveilles de l'Île Rouge avec le véhicule parfait pour votre road trip. De la côte au bush, votre aventure commence ici.
        </motion.p>

        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          onClick={() => setShowMore(!showMore)}
          className="w-fit px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all mb-8"
        >
          {showMore ? "Fermer l'itinéraire" : "Découvrir les destinations"}
        </motion.button>

        
        <AnimatePresence>
          {showMore && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="overflow-hidden w-full"
            >
              <div className="flex flex-col gap-6 pl-4 border-l-4 border-emerald-200">
                {madaDestinations.map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <span className="text-3xl bg-emerald-50 p-3 rounded-xl shadow-sm">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
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

     
      <article className="flex-1 flex justify-center w-full md:sticky md:top-20">
        <motion.img
          
          initial={{ opacity: 0, x: 40, scale: 1.05, filter: "blur(4px)" }}
          
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          
          transition={{ 
            duration: 2.5,          
            delay: 0.3,             
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="w-full max-w-lg rounded-3xl shadow-2xl object-cover h-[500px] md:h-[600px]"
          alt="Road trip à Madagascar, Allée des Baobabs"
          src="/images/reserver.jpg" 
        />
      </article>

    </div>
  );
}

export default Reserver;