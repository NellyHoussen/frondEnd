import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { voitureService, isAdmin } from "../../services/api";

export default function AjouteVoiture() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    marque: "",
    modele: "",
    prixParJour: "",
    immatriculation: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!isAdmin()) {
    return (
      <div className="max-w-md mx-auto px-4 py-10 text-center">
        <p className="text-red-600 font-medium">
          Accès réservé aux administrateurs.
        </p>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      setImage(null);
      setPreview(null);
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (
      !form.marque.trim() ||
      !form.modele.trim() ||
      !form.prixParJour ||
      !form.immatriculation.trim()
    ) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const voitureData = {
        marque: form.marque.trim(),
        modele: form.modele.trim(),
        prixParJour: Number(form.prixParJour),
        immatriculation: form.immatriculation.trim(),
        disponible: true,
        imageUrl: null,
      };

      await voitureService.create(voitureData, image);

      setSuccess(true);

      setForm({
        marque: "",
        modele: "",
        prixParJour: "",
        immatriculation: "",
      });

      setImage(null);
      setPreview(null);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout du véhicule.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Ajouter une voiture
      </h1>

      {success && (
        <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-green-700 flex justify-between items-center gap-4">
          <span>Véhicule ajouté avec succès !</span>

          <button
            type="button"
            onClick={() => navigate("/voitures")}
            className="text-sm underline"
          >
            Voir le catalogue
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow rounded-lg p-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marque
          </label>
          <input
            type="text"
            name="marque"
            value={form.marque}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modèle
          </label>
          <input
            type="text"
            name="modele"
            value={form.modele}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Immatriculation
          </label>
          <input
            type="text"
            name="immatriculation"
            value={form.immatriculation}
            onChange={handleChange}
            placeholder="Ex: 1234 AB 56"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix/jour (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="prixParJour"
            value={form.prixParJour}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo du véhicule
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              className="mt-3 w-full h-48 object-cover rounded-md border border-gray-200"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition"
        >
          {loading ? "Ajout en cours..." : "Ajouter la voiture"}
        </button>
      </form>
    </div>
  );
}