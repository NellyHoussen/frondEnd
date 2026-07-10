import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { userService} from "../services/api";
function Connexion() {
  const [form, setForm] = useState({ identifiant: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await userService.login(form);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50/40 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md shadow-amber-900/5 border border-amber-100/50 flex flex-col gap-6">

        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight text-amber-950">
            Prêt pour l'aventure ?
          </h1>
          <p className="text-sm text-amber-800/70 font-medium">
            Connectez-vous pour explorer votre espace voyage.
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

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 text-base cursor-pointer"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-sm text-amber-800/60">
          Pas encore de compte ?{" "}
          <Link to="/Inscription" className="text-orange-600 font-semibold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Connexion;