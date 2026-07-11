import { FiUser, FiLogOut, FiPlusCircle, FiClipboard, FiList } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/connexion");
  };

  const linkClass =
    "relative text-sm font-bold text-slate-700 transition duration-300 hover:text-emerald-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full";

  const iconLinkClass =
    "relative flex items-center gap-1.5 text-sm font-bold text-slate-700 transition duration-300 hover:text-emerald-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 text-slate-900 shadow-sm backdrop-blur">
      <div className="flex min-h-20 items-center justify-between px-10">
        <Link
          to="/"
          className="ml-4 flex flex-col leading-none transition duration-300 hover:scale-105"
        >
          <span className="text-3xl font-black uppercase tracking-[0.22em] bg-gradient-to-r from-emerald-700 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
            NOMADE
          </span>

          <span className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
            Réservation auto Madagascar
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/voitures" className={linkClass}>
            Nos voitures
          </Link>

          <Link to="/about" className={linkClass}>
            À propos
          </Link>

          <Link to="/contact" className={linkClass}>
            Contact
          </Link>

          {user && (
            <Link to="/mes-reservations" className={iconLinkClass}>
              <FiList className="text-base" />
              Mes réservations
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <>
              <Link to="/admin/ajouter-voiture" className={iconLinkClass}>
                <FiPlusCircle className="text-base" />
                Ajouter
              </Link>

              <Link to="/admin/reservations" className={iconLinkClass}>
                <FiClipboard className="text-base" />
                Réservations
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-3 border-l border-emerald-100 pl-5">
              <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 ring-1 ring-emerald-100">
                <FiUser className="text-base" />
                {user.identifiant}
              </span>

              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition duration-300 hover:bg-red-50 hover:text-red-600"
              >
                <FiLogOut className="text-base" />
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              to="/connexion"
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-emerald-500/20 transition duration-300 hover:bg-emerald-700"
            >
              <FiUser className="text-base" />
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;