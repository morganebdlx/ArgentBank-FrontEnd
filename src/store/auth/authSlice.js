import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false, // initialisation de l'état de connexion à false
    token: null, // initialisation du token à null
    user: null, // initialisation de l'utilisateur à null
  },
  reducers: {

    // action de login pour mettre à jour le state lors de la connexion
    loginAction: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    // action de logout pour mettre à jour le state lors de la déconnexion
    logoutAction: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
    // action de setUser pour mettre à jour l'utilisateur dans le state
    setUser: (state, action) => {
      state.user = action.payload.user;
    }
  }
})

// Sélecteur : renvoie le nom à afficher.
// Si userName existe, on l'utilise. Sinon on retombe sur prénom + nom.
export const selectDisplayName = (state) => {
  const user = state.auth.user;

  if (!user) return ""; // pas encore connecté / profil pas chargé
  if (user.userName) return user.userName;

  return [user.firstName, user.lastName]
    .filter(Boolean) // enlève les valeurs vides, évite d'afficher "null null"
    .join(" ");
};

export const { loginAction, logoutAction, setUser } = authSlice.actions;

export default authSlice.reducer;
