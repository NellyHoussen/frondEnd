import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiImage } from "react-icons/fi";

import { voitureService, getImageUrl } from "../../services/api";

function VoituresSuggerees({ nombre = 100 }) {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChoisir = (voitureId) => {
    navigate(`/reservation/${voitureId}`);
  };

  useEffect(() => {
    let annule = false;

    async function chargerVoitures() {
      setLoading(true);
      setError(null);

      try {
        const data = await voitureService.getAll();

        if (annule) return;

        const disponibles = data.filter((v) => v.disponible);
        const melange = [...disponibles].sort(() => Math.random() - 0.5);

        setVoitures(melange.slice(0, nombre));
      } catch (err) {
        if (!annule) {
          setError(
            "Impossible de charger les suggestions : " +
              (err.message || "Erreur inconnue")
          );
        }
      } finally {
        if (!annule) {
          setLoading(false);
        }
      }
    }

    chargerVoitures();

    return () => {
      annule = true;
    };
  }, [nombre]);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14">
        <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
          Chargement des suggestions...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white px-4 py-14">
        <p className="text-center font-semibold text-red-600">{error}</p>
      </section>
    );
  }

  if (voitures.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
              Sélection NOMADE
            </p>

            <h2 className="text-3xl font-black uppercase tracking-wide text-slate-950 md:text-4xl">
              Voitures suggérées pour votre trajet
              <span className="text-amber-500">.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Des véhicules disponibles, confortables et adaptés à vos déplacements
            à Madagascar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {voitures.map((v) => (
            <article
              key={v.id}
              className="group flex overflow-hidden rounded-[1.5rem] bg-white shadow-lg shadow-emerald-900/10 ring-1 ring-emerald-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/15"
            >
              <div className="flex w-full flex-col">
                <div className="relative h-44 overflow-hidden bg-emerald-50">
                  {v.imageUrl ? (
                    <img
                      src={getImageUrl(v.imageUrl)}
                      alt={`${v.marque} ${v.modele}`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-emerald-700">
                      <FiImage className="text-3xl" />
                      <span className="text-sm font-semibold">
                        Aucune image
                      </span>
                    </div>
                  )}

                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black uppercase text-emerald-700 shadow-sm">
                    <FiCheckCircle />
                    Disponible
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-black uppercase tracking-wide text-slate-950">
                    {v.marque} {v.modele}
                  </h3>

                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-2xl font-black text-emerald-700">
                      {v.prixParJour}
                    </span>
                    <span className="pb-1 text-sm font-bold text-slate-500">
                      €/jour
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleChoisir(v.id)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-md shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700"
                  >
                    Voir & réserver
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VoituresSuggerees;