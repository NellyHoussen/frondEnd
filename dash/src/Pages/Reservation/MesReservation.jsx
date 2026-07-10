import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reservationService, getCurrentUser } from "../../services/api";

const STATUT_STYLES = {
  EN_ATTENTE: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMEE: "bg-blue-50 text-blue-700 border-blue-200",
  EN_COURS: "bg-purple-50 text-purple-700 border-purple-200",
  TERMINEE: "bg-gray-50 text-gray-600 border-gray-200",
  ANNULEE: "bg-red-50 text-red-600 border-red-200",
};

const STATUT_LABELS = {
  EN_ATTENTE: "En attente",
  CONFIRMEE: "Confirmée",
  EN_COURS: "En cours",
  TERMINEE: "Terminée",
  ANNULEE: "Annulée",
};

function MesReservations() {
  const user = getCurrentUser();
  const clientId = user?.clientId || user?.id;

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(!!clientId);
  const [error, setError] = useState(null);
  const [annulationEnCours, setAnnulationEnCours] = useState(null);

  useEffect(() => {
    if (!clientId) return;

    let annule = false;

    async function charger() {
      try {
        const data = await reservationService.getByClient(clientId);

        if (!annule) {
          setReservations(data);
        }
      } catch (err) {
        if (!annule) {
          setError(err.message);
        }
      } finally {
        if (!annule) {
          setLoading(false);
        }
      }
    }

    charger();

    return () => {
      annule = true;
    };
  }, [clientId]);

  const handleAnnuler = (id) => {
    if (!window.confirm("Voulez-vous vraiment annuler cette réservation ?")) {
      return;
    }

    setAnnulationEnCours(id);

    reservationService
      .annuler(id)
      .then(() => {
        setReservations((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, statutReservation: "ANNULEE" } : r
          )
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setAnnulationEnCours(null));
  };

  if (!user || !user.id) {
    return (
      <div className="max-w-md mx-auto bg-amber-50 border border-amber-200 p-8 rounded-2xl shadow-md my-16 text-center">
        <h2 className="text-xl font-bold text-amber-800 mb-2">
          Connexion requise
        </h2>

        <p className="text-sm text-amber-700 mb-6">
          Connectez-vous pour voir vos réservations.
        </p>

        <Link
          to="/connexion"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-base px-6 py-3 rounded-xl font-semibold transition shadow-sm"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-gray-500 text-lg">
          Chargement de vos réservations...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Mes réservations
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-lg mb-4">
            Vous n'avez pas encore de réservation.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-xl font-semibold transition"
          >
            Découvrir nos véhicules
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {reservations.map((r) => {
            const peutAnnuler =
              r.statutReservation === "EN_ATTENTE" ||
              r.statutReservation === "CONFIRMEE";

            return (
              <div
                key={r.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {r.voitureLibelle}
                    </h3>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        STATUT_STYLES[r.statutReservation] || ""
                      }`}
                    >
                      {STATUT_LABELS[r.statutReservation] ||
                        r.statutReservation}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">
                    Du{" "}
                    <span className="font-medium text-gray-700">
                      {r.dateDebut}
                    </span>{" "}
                    au{" "}
                    <span className="font-medium text-gray-700">
                      {r.dateFin}
                    </span>
                  </p>

                  <p className="text-xl text-gray-900 font-bold mt-2">
                    {r.montantTotal} €
                  </p>
                </div>

                {peutAnnuler && (
                  <button
                    type="button"
                    onClick={() => handleAnnuler(r.id)}
                    disabled={annulationEnCours === r.id}
                    className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-base font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
                  >
                    {annulationEnCours === r.id
                      ? "Annulation..."
                      : "Annuler la réservation"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MesReservations;