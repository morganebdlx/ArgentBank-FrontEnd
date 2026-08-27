import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "./store/auth/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  // Récupération de l'état global pour savoir si l'utilisateur est connecté avec son nom et prénom
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fonction pour se déconnecter
  const handleLogout = () => {
    // Suppression du token du localStorage et du sessionStorage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // Mise à jour de l'état global pour indiquer que l'utilisateur est déconnecté
    dispatch(logoutAction());
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userName={user ?`${user.firstName} ${user.lastName}` : ""}
              onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
