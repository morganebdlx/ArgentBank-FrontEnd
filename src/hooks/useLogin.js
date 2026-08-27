import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginAction } from "../store/auth/authSlice";

const useLogin = () => {
  // Récupération du dispatch pour mettre à jour l'état global
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour se connecter avec POST
  const login = async (username, password, rememberMe) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email:username, password }),
  });

  const data = await response.json();
  console.log(data);

  // Si la requête est réussie, on met à jour l'état global avec le token
  if (response.ok) {
    // Stockage du token dans le localStorage
     if (rememberMe) {
        localStorage.setItem("token", data.body.token);
      } else {
        sessionStorage.setItem("token", data.body.token);
      }

      dispatch(loginAction({ token: data.body.token }));
    setIsLoading(false);


    return true;
  }
  setIsLoading(false);
  setError("Invalid username or password");
  return false;
}

return { login, isLoading, error };
}
export default useLogin;
