import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

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
      <p className="text-center py-6">
        Chargement des suggestions...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-6 text-red-600">
        {error}
      </p>
    );
  }

  if (voitures.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Suggestions pour vous
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {voitures.map((v) => (
          <div
            key={v.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              {v.imageUrl ? (
                <img
                  src={getImageUrl(v.imageUrl)}
                  alt={`${v.marque} ${v.modele}`}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  Aucune image
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-gray-900">
                  {v.marque} {v.modele}
                </h3>

                <p className="text-gray-700 font-medium mb-3">
                  {v.prixParJour} €/jour
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
             <button
             type="button"
               onClick={() => handleChoisir(v.id)}
               className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition"
  >
    Voir & Réserver
  </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VoituresSuggerees;