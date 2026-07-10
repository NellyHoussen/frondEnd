import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50/40 px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md shadow-amber-900/5 border border-amber-100/50 flex flex-col gap-6">

        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight text-amber-950">
            Prêt pour l'aventure ?
          </h1>
          <p className="text-sm text-amber-800/70 font-medium">
            Inscrivez-vous pour explorer votre espace voyage.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="identifiant" className="text-sm font-semibold text-amber-950/80">
              Identifiant
            </label>
            <input
              id="identifiant"
              name="identifiant"
              type="text"
              placeholder="Votre identifiant"
              value={form.identifiant}
              onChange={handleChange}
              required
              className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="nom" className="text-sm font-semibold text-amber-950/80">
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
                className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="prenom" className="text-sm font-semibold text-amber-950/80">
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
                className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-amber-950/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="telephone" className="text-sm font-semibold text-amber-950/80">
              Téléphone
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={form.telephone}
              onChange={handleChange}
              required
              className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-amber-950/80">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="checkPassword" className="text-sm font-semibold text-amber-950/80">
              Confirmation mot de passe
            </label>
            <input
              id="checkPassword"
              name="checkPassword"
              type="password"
              placeholder="••••••••"
              value={form.checkPassword}
              onChange={handleChange}
              required
              className="w-full text-base border border-amber-200/60 rounded-xl px-4 py-3 bg-amber-50/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200 placeholder-amber-700/30 text-amber-950"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 text-base cursor-pointer"
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-sm text-amber-800/60">
          Vous avez déjà un compte ?{" "}
          <Link to="/Connexion" className="text-orange-600 font-semibold hover:underline">
            Se Connecter
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Inscription;