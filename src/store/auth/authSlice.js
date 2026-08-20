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
    // action de setUser pour mettre à jour l'utilisateur dans le state
    setUser: (state, action) => {
      state.user = action.payload.user;
    }
  }
})

// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const { loginAction, setUser } = authSlice.actions;

export default authSlice.reducer;
