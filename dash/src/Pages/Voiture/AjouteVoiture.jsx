import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiDollarSign,
  FiHash,
  FiImage,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4">
        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-center text-sm font-bold text-red-600">
          Accès réservé aux administrateurs.
        </div>
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

  const inputClass =
    "w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  const labelClass =
    "mb-2 block text-xs font-black uppercase tracking-wide text-slate-500";

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-100 sm:p-8">
          <div className="mb-7">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              <FiTruck />
            </div>

            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
              Espace administrateur
            </p>

            <h1 className="text-3xl font-black uppercase tracking-wide text-slate-950 md:text-4xl">
              Ajouter une voiture
              <span className="text-amber-500">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Complétez les informations du véhicule pour l'ajouter au
              catalogue NOMADE.
            </p>
          </div>

          {success && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
              <span className="flex items-center gap-2">
                <FiCheckCircle /> Véhicule ajouté avec succès !
              </span>
              <button
                type="button"
                onClick={() => navigate("/voitures")}
                className="font-black text-emerald-800 underline hover:text-emerald-900"
              >
                Voir le catalogue
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="marque" className={labelClass}>
                  Marque
                </label>
                <input
                  id="marque"
                  name="marque"
                  type="text"
                  placeholder="Ex: Toyota"
                  value={form.marque}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="modele" className={labelClass}>
                  Modèle
                </label>
                <input
                  id="modele"
                  name="modele"
                  type="text"
                  placeholder="Ex: Land Cruiser"
                  value={form.modele}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="immatriculation" className={labelClass}>
                Immatriculation
              </label>
              <div className="relative">
                <FiHash className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                <input
                  id="immatriculation"
                  name="immatriculation"
                  type="text"
                  placeholder="Ex: 1234 AB 56"
                  value={form.immatriculation}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="prixParJour" className={labelClass}>
                Prix par jour
              </label>
              <div className="relative">
                <FiDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                <input
                  id="prixParJour"
                  name="prixParJour"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.prixParJour}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className={labelClass}>
                Photo du véhicule
              </label>

              <label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-4 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                <FiImage className="text-lg" />
                {image ? image.name : "Choisir une image"}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Aperçu"
                  className="mt-4 h-48 w-full rounded-2xl border border-emerald-100 object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Ajout en cours..." : "Ajouter la voiture"}
              <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
