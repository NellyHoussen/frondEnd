import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiShield,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { reservationService, isAdmin } from "../../services/api";

const STATUT_STYLES = {
  EN_ATTENTE: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMEE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  EN_COURS: "bg-sky-50 text-sky-700 border-sky-200",
  TERMINEE: "bg-slate-50 text-slate-600 border-slate-200",
  ANNULEE: "bg-red-50 text-red-600 border-red-200",
  REJETEE: "bg-red-50 text-red-600 border-red-200",
};

const STATUT_LABELS = {
  EN_ATTENTE: "En attente",
  CONFIRMEE: "Confirmée",
  EN_COURS: "En cours",
  TERMINEE: "Terminée",
  ANNULEE: "Annulée",
  REJETEE: "Rejetée",
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionEnCours, setActionEnCours] = useState(null);

  useEffect(() => {
    chargerReservations();
  }, []);

  if (!isAdmin()) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-20">
        <div className="mx-auto max-w-md rounded-[1.75rem] border border-red-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
            <FiShield />
          </div>

          <h2 className="text-2xl font-black uppercase tracking-wide text-slate-950">
            Accès refusé
          </h2>

          <p className="mt-3 text-sm font-semibold text-slate-600">
            Cette page est réservée aux administrateurs.
          </p>
        </div>
      </section>
    );
  }

  async function chargerReservations() {
    try {
      setLoading(true);
      const data = await reservationService.getAll();
      const trie = [...data].sort(
        (a, b) => new Date(b.dateDebut) - new Date(a.dateDebut)
      );
      setReservations(trie);
      setError(null);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des réservations.");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmer(id) {
    if (!window.confirm("Confirmer cette réservation ?")) return;

    try {
      setActionEnCours(id);
      await reservationService.confirmer(id);
      setReservations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, statutReservation: "CONFIRMEE" } : r
        )
      );
    } catch (err) {
      alert(err.message || "Erreur lors de la confirmation de la réservation.");
    } finally {
      setActionEnCours(null);
    }
  }

  async function handleRejeter(id) {
    if (!window.confirm("Confirmer le rejet de cette réservation ?")) return;

    try {
      setActionEnCours(id);
      await reservationService.rejeter(id);
      setReservations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, statutReservation: "REJETEE" } : r
        )
      );
    } catch (err) {
      alert(err.message || "Erreur lors du rejet de la réservation.");
    } finally {
      setActionEnCours(null);
    }
  }

  async function handleSupprimer(id) {
    if (
      !window.confirm(
        "Supprimer définitivement cette réservation ? Cette action est irréversible."
      )
    ) {
      return;
    }

    try {
      setActionEnCours(id);
      await reservationService.supprimer(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err.message || "Erreur lors de la suppression de la réservation.");
    } finally {
      setActionEnCours(null);
    }
  }

  const reservationsEnAttente = reservations.filter(
    (r) => r.statutReservation === "EN_ATTENTE"
  ).length;

  const reservationsConfirmees = reservations.filter(
    (r) => r.statutReservation === "CONFIRMEE"
  ).length;

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-24">
        <p className="text-center text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
          Chargement des réservations...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
              Administration NOMADE
            </p>

            <h1 className="text-3xl font-black uppercase tracking-wide text-slate-950 md:text-4xl">
              Gestion des réservations
              <span className="text-amber-500">.</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
              Consultez les demandes clients, confirmez les réservations et
              gardez le suivi des trajets à jour.
            </p>
          </div>

          <button
            type="button"
            onClick={chargerReservations}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100 shadow-sm transition duration-300 hover:bg-emerald-600 hover:text-white"
          >
            <FiRefreshCw />
            Actualiser
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-900/10">
            <p className="text-sm font-bold text-slate-500">Total</p>
            <p className="mt-2 text-3xl font-black text-slate-950">
              {reservations.length}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-lg shadow-emerald-900/10">
            <p className="text-sm font-bold text-slate-500">En attente</p>
            <p className="mt-2 text-3xl font-black text-amber-600">
              {reservationsEnAttente}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-900/10">
            <p className="text-sm font-bold text-slate-500">Confirmées</p>
            <p className="mt-2 text-3xl font-black text-emerald-700">
              {reservationsConfirmees}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={chargerReservations}
              className="font-black uppercase underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="rounded-[1.75rem] border-2 border-dashed border-emerald-200 bg-white/70 px-6 py-16 text-center shadow-sm">
            <FiClock className="mx-auto mb-4 text-4xl text-emerald-700" />
            <p className="text-lg font-bold text-slate-600">
              Aucune réservation pour le moment.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[1.5rem] border border-emerald-100 bg-white shadow-xl shadow-emerald-900/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-100">
                <thead className="bg-emerald-50/70">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Client
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Voiture
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Début
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Fin
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Montant
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                      Statut
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-50 bg-white">
                  {reservations.map((r) => (
                    <tr
                      key={r.id}
                      className="transition duration-200 hover:bg-emerald-50/50"
                    >
                      <td className="px-5 py-4 text-sm font-bold text-slate-800">
                        {r.clientNomComplet}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                        {r.voitureLibelle}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                        {new Date(r.dateDebut).toLocaleDateString("fr-FR")}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                        {new Date(r.dateFin).toLocaleDateString("fr-FR")}
                      </td>

                      <td className="px-5 py-4 text-sm font-black text-emerald-700">
                        {r.montantTotal} €
                      </td>

                      <td className="px-5 py-4 text-sm">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                            STATUT_STYLES[r.statutReservation] ??
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {STATUT_LABELS[r.statutReservation] ||
                            r.statutReservation}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleConfirmer(r.id)}
                            disabled={
                              actionEnCours === r.id ||
                              r.statutReservation === "CONFIRMEE" ||
                              r.statutReservation === "REJETEE" ||
                              r.statutReservation === "ANNULEE"
                            }
                            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-black uppercase text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <FiCheckCircle />
                            Confirmer
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRejeter(r.id)}
                            disabled={
                              actionEnCours === r.id ||
                              r.statutReservation === "REJETEE" ||
                              r.statutReservation === "ANNULEE"
                            }
                            className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-2 text-xs font-black uppercase text-amber-700 ring-1 ring-amber-100 transition hover:bg-amber-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <FiXCircle />
                            Rejeter
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSupprimer(r.id)}
                            disabled={actionEnCours === r.id}
                            className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-2 text-xs font-black uppercase text-red-600 ring-1 ring-red-100 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <FiTrash2 />
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}