import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiLogIn,
  FiUser,
} from "react-icons/fi";
import {
  voitureService,
  clientService,
  reservationService,
  getCurrentUser,
  getImageUrl,
} from "../../services/api";

function PageReservation() {
  const { voitureId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const clientId = user?.clientId || user?.id;

  const [voiture, setVoiture] = useState(null);
  const [chargementVoiture, setChargementVoiture] = useState(true);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateDebut: "",
    dateFin: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    let annule = false;

    voitureService
      .getById(voitureId)
      .then((data) => {
        if (!annule) setVoiture(data);
      })
      .catch((err) => console.error("Erreur chargement voiture", err))
      .finally(() => {
        if (!annule) setChargementVoiture(false);
      });

    return () => {
      annule = true;
    };
  }, [voitureId]);

  useEffect(() => {
    if (!clientId) return;

    let annule = false;

    clientService
      .getById(clientId)
      .then((data) => {
        if (annule) return;

        setForm((prev) => ({
          ...prev,
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          telephone: data.telephone || "",
        }));
      })
      .catch((err) => console.error("Erreur chargement client", err));

    return () => {
      annule = true;
    };
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setStatus({
        loading: false,
        message: "Vous devez être connecté pour réserver.",
        type: "error",
      });
      return;
    }

    if (!clientId) {
      setStatus({
        loading: false,
        message: "Impossible de trouver votre compte client.",
        type: "error",
      });
      return;
    }

    if (new Date(form.dateFin) <= new Date(form.dateDebut)) {
      setStatus({
        loading: false,
        message: "La date de fin doit être postérieure à la date de début.",
        type: "error",
      });
      return;
    }

    setStatus({
      loading: true,
      message: "Traitement de votre réservation...",
      type: "info",
    });

    const reservationCompleteDto = {
      client: {
        id: Number(clientId),
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        telephone: form.telephone,
      },
      reservation: {
        voitureId: Number(voitureId),
        clientId: Number(clientId),
        dateDebut: form.dateDebut,
        dateFin: form.dateFin,
      },
    };

    reservationService
      .createComplete(reservationCompleteDto)
      .then(() => {
        setStatus({
          loading: false,
          message: "Réservation enregistrée avec succès !",
          type: "success",
        });

        setTimeout(() => navigate("/mes-reservations"), 2000);
      })
      .catch((err) => {
        setStatus({
          loading: false,
          message: `Échec : ${err.message}`,
          type: "error",
        });
      });
  };

  const inputClass =
    "w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  const labelClass = "mb-2 block text-xs font-black uppercase tracking-wide text-slate-500";

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
            Vous devez être connecté pour réserver ce véhicule avec NOMADE.
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

  if (chargementVoiture || !voiture) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-24">
        <p className="text-center text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
          Chargement du véhicule...
        </p>
      </section>
    );
  }

  const aujourdhui = new Date().toISOString().split("T")[0];

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100 shadow-sm transition duration-300 hover:bg-emerald-600 hover:text-white"
        >
          <FiArrowLeft />
          Retour
        </button>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-100">
            <div className="relative h-72 bg-emerald-50">
              {voiture.imageUrl ? (
                <img
                  src={getImageUrl(voiture.imageUrl)}
                  alt={`${voiture.marque} ${voiture.modele}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-bold text-emerald-700">
                  Aucune image disponible
                </div>
              )}

              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase text-emerald-700 shadow-sm">
                Disponible
              </span>
            </div>

            <div className="p-6">
              <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
                Votre véhicule
              </p>

              <h1 className="text-3xl font-black uppercase tracking-wide text-slate-950">
                {voiture.marque} {voiture.modele}
              </h1>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <FiCreditCard className="text-emerald-700" />
                    Tarif journalier
                  </span>

                  <span className="text-xl font-black text-emerald-700">
                    {voiture.prixParJour} €/jour
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                  <FiClock />
                  Votre demande sera vérifiée avant confirmation.
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-100 sm:p-8">
            <div className="mb-7">
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
                Finaliser la réservation
              </p>

              <h2 className="text-3xl font-black uppercase tracking-wide text-slate-950">
                Vos informations
                <span className="text-amber-500">.</span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Vérifiez vos coordonnées, choisissez vos dates, puis envoyez
                votre demande de réservation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <fieldset>
                <legend className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-900">
                  <FiUser className="text-emerald-700" />
                  Coordonnées
                </legend>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Nom</label>
                    <input
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Prénom</label>
                    <input
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Téléphone</label>
                    <input
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-900">
                  <FiCalendar className="text-emerald-700" />
                  Période de réservation
                </legend>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Date de début</label>
                    <input
                      type="date"
                      name="dateDebut"
                      min={aujourdhui}
                      value={form.dateDebut}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Date de fin</label>
                    <input
                      type="date"
                      name="dateFin"
                      min={form.dateDebut || aujourdhui}
                      value={form.dateFin}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {status.message && (
                <div
                  className={`rounded-2xl px-5 py-4 text-sm font-bold ${
                    status.type === "error"
                      ? "bg-red-50 text-red-600 ring-1 ring-red-100"
                      : status.type === "success"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                      : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full bg-slate-100 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-600 transition duration-300 hover:bg-slate-200"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiCheckCircle />
                  {status.loading ? "Envoi..." : "Confirmer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageReservation;