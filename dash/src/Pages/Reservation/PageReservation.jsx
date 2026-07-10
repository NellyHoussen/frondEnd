import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  voitureService,
  clientService,
  reservationService,
  getCurrentUser,
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

  if (!user || !user.id) {
    return (
      <div className="max-w-md mx-auto bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-md my-10 text-center">
        <h2 className="text-lg font-bold text-amber-800 mb-2">
          Connexion requise
        </h2>
        <p className="text-sm text-amber-700 mb-4">
          Vous devez être connecté pour réserver.
        </p>
        <Link
          to="/connexion"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded font-medium transition"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (chargementVoiture || !voiture) {
    return (
      <p className="text-center py-10 text-gray-500">
        Chargement des détails du véhicule...
      </p>
    );
  }

  const aujourdhui = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md my-10 border border-gray-100">
      <h2 className="text-xl font-bold mb-1 text-gray-800">
        Réserver : {voiture.marque} {voiture.modele}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {voiture.prixParJour} €/jour
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset className="border rounded-md p-4">
          <legend className="text-xs font-semibold text-gray-600 px-1">
            Vos informations
          </legend>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded-md p-4">
          <legend className="text-xs font-semibold text-gray-600 px-1">
            Période de réservation
          </legend>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                name="dateDebut"
                min={aujourdhui}
                value={form.dateDebut}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                name="dateFin"
                min={form.dateDebut || aujourdhui}
                value={form.dateFin}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm"
                required
              />
            </div>
          </div>
        </fieldset>

        {status.message && (
          <div
            className={`p-3 rounded text-sm text-center font-medium ${
              status.type === "error"
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={status.loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded text-sm transition"
          >
            {status.loading ? "Envoi..." : "Confirmer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PageReservation;