import { useEffect, useState, useContext } from "react";
import AuthContext from "/src/context/AuthContext";
import { UserContext } from "/src/context/UserContext";

function useCheckAuth() {
  const { currentUser } = useContext(UserContext);
  // const { setAuth } = useContext(AuthContext); // Récupérer l’état global de l’auth
  const [isLoading, setIsLoading] = useState(true); // Gérer le chargement
  const [errorMessage, setErrorMessage] = useState(""); // Gérer les erreurs éventuelles

  useEffect(() => {
    async function fetchAuthentification() {
      try {
        const response = await fetch("/back/v1/auth/check-auth", {
          credentials: "include", // Inclure les cookies dans la requête
        });

        if (response.status === 401) {
          // Pas connecté
          setErrorMessage(
            "Vous devez être connecté pour accéder à cette page."
          );
          setAuth({ isAuthenticated: false, user: null }); // Met à jour le contexte
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          const data = await response.json(); // Récupérer les données utilisateurs
          setAuth({ isAuthenticated: true, user: data }); // Mettre à jour le contexte
        } else {
          setErrorMessage("Une erreur est survenue lors de la vérification.");
          setAuth({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        setErrorMessage("Impossible de vérifier l'authentification.");
        // setAuth({ isAuthenticated: false, user: null });
      } finally {
        setIsLoading(false);
      }
    }

    fetchAuthentification();
  }, []); // Exécuter une seule fois ou quand `setAuth` change

  return [currentUser, isLoading, errorMessage];
}

export default useCheckAuth;
