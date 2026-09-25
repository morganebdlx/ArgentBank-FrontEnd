import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth/authSlice";

const useUpdateName = () => {
  // Récupération du dispatch pour mettre à jour l'état global
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  // Fonction pour mettre à jour le nom de l'utilisateur
  const updateName = async (userName) => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(userName),
  });

  const data = await response.json();

// Si la requête est réussie, on met à jour l'état global avec les informations de l'utilisateur
  if (response.ok) {
    dispatch(setUser({ user: data.body }));
  }
}
return { updateName };
}
export default useUpdateName;
