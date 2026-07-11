import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import { userService } from "../services/api";

function Inscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    identifiant: "",
    password: "",
    checkPassword: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await userService.register(form);
      navigate("/Connexion");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

  const labelClass =
    "mb-2 block text-xs font-black uppercase tracking-wide text-slate-500";

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-4 py-14 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-100 sm:p-8">
          <div className="mb-7">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              <FiUserPlus />
            </div>

            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.3em] text-emerald-700">
              Rejoindre NOMADE
            </p>

            <h1 className="text-3xl font-black uppercase tracking-wide text-slate-950 md:text-4xl">
              Créez votre compte
              <span className="text-amber-500">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Réservez plus rapidement, suivez vos demandes et préparez vos
              trajets à Madagascar depuis votre espace personnel.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="identifiant" className={labelClass}>
                Identifiant
              </label>

              <div className="relative">
                <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                <input
                  id="identifiant"
                  name="identifiant"
                  type="text"
                  placeholder="Votre identifiant"
                  value={form.identifiant}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className={labelClass}>
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  placeholder="Votre nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="prenom" className={labelClass}>
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={form.prenom}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>

              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="telephone" className={labelClass}>
                Téléphone
              </label>

              <div className="relative">
                <FiPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  placeholder="+261 34 00 000 00"
                  value={form.telephone}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className={labelClass}>
                  Mot de passe
                </label>

                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkPassword" className={labelClass}>
                  Confirmation
                </label>

                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" />
                  <input
                    id="checkPassword"
                    name="checkPassword"
                    type="password"
                    placeholder="••••••••"
                    value={form.checkPassword}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
              <FiArrowRight />
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-semibold text-slate-600">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/Connexion"
              className="font-black text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <aside className="relative hidden min-h-[640px] overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-900/20 lg:block">
          <img
            src="/images/reserver.jpg"
            alt="Voyage à Madagascar avec NOMADE"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
              Madagascar vous attend
            </p>

            <h2 className="max-w-md text-3xl font-black uppercase leading-tight">
              Un compte, vos réservations, votre prochaine route.
            </h2>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Inscription;