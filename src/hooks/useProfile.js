import { useDispatch } from "react-redux";
import { setUser } from "../store/auth/authSlice";

const useProfile = () => {
  // Récupération du dispatch pour mettre à jour l'état global
  const dispatch = useDispatch();

  // Fonction pour récupérer les informations du profil de l'utilisateur avec GET
  const profile = async (token) => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

  const data = await response.json();

// Si la requête est réussie, on met à jour l'état global avec les informations de l'utilisateur
  if (response.ok) {
    dispatch(setUser({ user: data.body }));
  }
}
return { profile };
}
export default useProfile;
