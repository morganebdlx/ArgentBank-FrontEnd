import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthSession from "./hooks/useAuthSession";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  // Récupération de l'état de connexion depuis le store Redux
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Restauration de la session + chargement du profil
  useAuthSession();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/sign-in" />} /> {/* Redirection vers la page de connexion si l'utilisateur n'est pas connecté */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
