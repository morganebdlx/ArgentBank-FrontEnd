import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUser } from "../store/auth/authSlice";

const useUpdateName = () => {
  const dispatch = useDispatch();

  // Récupération du token et de l'utilisateur depuis le store Redux
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Utilisation de useState pour gérer l'état de chargement et les erreurs
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour mettre à jour le nom de l'utilisateur
  const updateName = async (userName) => {
    setIsLoading(true); // Début du chargement
    setError(null); // Réinitialisation de l'erreur

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: userName }),
        }
      );

      const data = await response.json();

      // Vérification de la réponse de l'API
      if (response.ok) {
        dispatch(
          setUser({
            user: {
              ...user,
              ...data.body,
              userName: userName,
            },
          })
        );

        return true;
      }

      // Gestion des erreurs de l'API
      setError("Impossible de modifier le nom.");
      return false;
    } catch {
      setError("Erreur de connexion au serveur.");
      return false;
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  return { updateName, isLoading, error };
};

export default useUpdateName;
