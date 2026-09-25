import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "./store/auth/authSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  // Récupération de l'état de connexion depuis le store Redux
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // Vérification du token dans le localStorage pour maintenir l'état de connexion
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginAction({ token }));
    }
  }, [dispatch]);



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
