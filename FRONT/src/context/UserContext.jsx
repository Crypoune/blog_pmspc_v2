import { useContext, createContext, useState } from "react";
import { useAuthCtx } from "/src/context/AuthContext";

// Création du contexte utilisateur
export const UserContext = createContext();

// Valeurs initiales de l'utilisateur
const INITIAL_USER = {
  id: 0,
  name: "",
  mail: "",
  role: "",
  status: "",
  created_date: "",
};

// Création du Provider pour le contexte utilisateur
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);

  const { login, logout, user } = useAuthCtx();

  // Fonction pour connecter un utilisateur
  const userLogin = (id, name, mail, role, status, created_date) => {
    setCurrentUser({ id, name, mail, role, status, created_date });
    login({ id, name, mail, role, status, created_date });
  };

  // Fonction pour déconnecter un utilisateur
  const userLogout = () => {
    setCurrentUser(INITIAL_USER);
    logout();
  };

  function userName() {
    return currentUser.name;
  }

  function userId() {
    return currentUser.id;
  }

  function userMail() {
    return currentUser.mail;
  }

  function userRole() {
    return currentUser.role;
  }

  function userStatus() {
    return currentUser.status;
  }

  function createdDate() {
    const d = new Date(currentUser.created_date);
    const locCrDate = d.toLocaleString().substring(0, 10);
    return locCrDate;
  }

  function isLogged() {
    return currentUser.id > 0;
  }

  function isAdmin() {
    return currentUser.role === "admin";
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userLogin,
        userLogout,
        isLogged,
        isAdmin,
        userName,
        userId,
        userMail,
        userRole,
        userStatus,
        createdDate,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
