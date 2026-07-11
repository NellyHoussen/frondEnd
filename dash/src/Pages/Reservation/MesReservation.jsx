import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiCreditCard,
  FiLogIn,
  FiMapPin,
  FiXCircle,
} from "react-icons/fi";
import { reservationService, getCurrentUser } from "../../services/api";

const STATUT_STYLES = {
  EN_ATTENTE: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMEE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  EN_COURS: "bg-sky-50 text-sky-700 border-sky-200",
  TERMINEE: "bg-slate-50 text-slate-600 border-slate-200",
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
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-20">
        <div className="mx-auto max-w-md rounded-[1.75rem] border border-amber-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">
            <FiLogIn />
          </div>

          <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
            Connexion requise
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Connectez-vous pour consulter vos réservations et suivre vos trajets
            avec NOMADE.
          </p>

          <Link
            to="/connexion"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-emerald-600 px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700"
          >
            Se connecter
          </Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-24">
        <p className="text-center text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
          Chargement de vos réservations...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-9">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
            Espace client
          </p>

          <h1 className="text-3xl font-black uppercase tracking-wide text-slate-950 md:text-4xl">
            Mes réservations
            <span className="text-amber-500">.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Retrouvez vos demandes de réservation, leurs statuts et les détails
            de vos prochains déplacements avec NOMADE.
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="rounded-[1.75rem] border-2 border-dashed border-emerald-200 bg-white/70 px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              <FiMapPin />
            </div>

            <p className="text-lg font-bold text-slate-600">
              Vous n’avez pas encore de réservation.
            </p>

            <Link
              to="/voitures"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-600 px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700"
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
                <article
                  key={r.id}
                  className="flex flex-col gap-5 rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/15 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black uppercase tracking-wide text-slate-950">
                        {r.voitureLibelle}
                      </h3>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                          STATUT_STYLES[r.statutReservation] || ""
                        }`}
                      >
                        {STATUT_LABELS[r.statutReservation] ||
                          r.statutReservation}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
                      <span className="flex items-center gap-2">
                        <FiCalendar className="text-emerald-700" />
                        Du {r.dateDebut} au {r.dateFin}
                      </span>

                      <span className="flex items-center gap-2">
                        <FiCreditCard className="text-emerald-700" />
                        {r.montantTotal} €
                      </span>
                    </div>
                  </div>

                  {peutAnnuler && (
                    <button
                      type="button"
                      onClick={() => handleAnnuler(r.id)}
                      disabled={annulationEnCours === r.id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-6 py-3 text-sm font-black uppercase tracking-wide text-red-600 ring-1 ring-red-100 transition duration-300 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      <FiXCircle />
                      {annulationEnCours === r.id
                        ? "Annulation..."
                        : "Annuler"}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default MesReservations;