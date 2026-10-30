import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/auth/authSlice";
import useProfile from "./useProfile";

// Gère la session utilisateur : restaure le token et charge le profil
const useAuthSession = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { profile } = useProfile();

  // Au démarrage de l'app : on récupère le token sauvegardé
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(loginAction({ token: storedToken }));
    }
  }, [dispatch]);

  // Dès qu'un token est présent : on charge le profil dans le store
  useEffect(() => {
    if (token) {
      profile(token);
    }
  }, [token]);
};

export default useAuthSession;
