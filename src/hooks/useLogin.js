import { useDispatch } from "react-redux";
import { loginAction } from "../store/auth/authSlice";

const useLogin = () => {
  // Récupération du dispatch pour mettre à jour l'état global
  const dispatch = useDispatch();

  // Fonction pour se connecter avec POST
  const login = async (username, password) => {
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
    dispatch(loginAction({ token: data.body.token }));
    return true;
  }
  return false;
}

return { login };
}
export default useLogin;
