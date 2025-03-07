import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading authentication state:", err);
    return undefined;
  }
};

const initialState = loadState() || {
  isLoggedIn: false,
  isAdmin: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      state.isAdmin = action.payload.isAdmin;

      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.userData = null;

      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;
