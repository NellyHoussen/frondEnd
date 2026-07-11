import HomePage from "./Pages/HomePage";
import Voitures from "./Pages/Voiture/Voiture";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Connexion from "./Pages/Connexion";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import NavBar from "./Components/home/NavBar";
import Inscription from "./Pages/Inscription";
import AjouterVoiture from "./Pages/Voiture/AjouteVoiture";
import PageReservation from "./Pages/Reservation/PageReservation"
import MesReservations from "./Pages/Reservation/MesReservation"
import AdminReservations from "./Pages/Reservation/AdminReservation"
function App() {
   /*
  h-* : hauteur
  flex : active flexbox
  justify-between : espace entre éléments
  items-center:aligne text
  gap-* : espace entre items
  p-* : padding
  font-bold : texte gras
  ml-* / mr-* : marges gauche/droite
  cursor-pointer : élément cliquable
  hover:* : effet au survol
  transition + duration : animation fluide
  -------------------------** npm install react-icons----------------
  --->import pour apporter des icons
-------> npm install react-router-dom
  */

       
  return (
   <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voitures" element={<Voitures />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/admin/ajouter-voiture" element={<AjouterVoiture />} />
        <Route path="/reservation/:voitureId" element={<PageReservation />} />
         <Route path="/mes-reservations" element={<MesReservations />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />

      </Routes>
    </BrowserRouter>    
  )
} 

export default App;
