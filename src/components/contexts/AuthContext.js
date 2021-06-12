import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function passwordReset(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    logout,
    signUp,
    login,
    passwordReset,
    loading,
  };

  return <AuthContext.Provider value={values}>{!loading && children}</AuthContext.Provider>;
}
