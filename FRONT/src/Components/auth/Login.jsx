import { useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "/src/context/UserContext";
import { verifEmail } from "/src/Components/utils/verifMail.js";
import { verifPassword } from "/src/Components/utils/verifPassword.js";

const Login = () => {
  const [searchParams] = useSearchParams();
  /* b= Inscription ou connection en paramètre de l'URL */
  const theButton = searchParams.get("b");
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Utilisation d'une variable locale isValid pour contrôler les erreurs
    let isValid = true; // Variable locale au lieu de `useState`

    if (theButton === "inscription") {
      if (!verifEmail(email)) {
        setUserMessage("Ce n'est pas une adresse mail valide.");
        isValid = false;
      }
      if (!verifPassword(password)) {
        setUserMessage(
          "Utiliser au moins un chiffre, une minuscule, une majuscule et un caractère spécial"
        );
        isValid = false;
      }
      if (password !== secondpassword) {
        /* Les mots de passe ne correspondent pas */
        setUserMessage("Les mots de passe ne correspondent pas.");
        isValid = false;
      }
    }

    if (isValid) {
      changeProfile();
    }
  };

  const changeProfile = async () => {
    try {
      if (theButton === "inscription") {
        const response = await fetch(
          "http://localhost:9000/back/v1/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (!response.ok) {
          setUserMessage("Erreur lors de l'enregistrement");
          return;
        }
      }

      const response = await fetch("http://localhost:9000/back/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
        credentials: "include",
      });

      const data = await response.json();

      userLogin(
        data.user.id,
        data.user.username,
        data.user.email,
        data.user.role,
        data.user.status,
        data.user.created_date
      );

      navigate("/");
    } catch (error) {
      setUserMessage("Erreur lors de l'enregistrement");
    }
  };

  const verifPasswordBlur = () => {
    if (password !== secondpassword) {
      /* Les mots de passe ne correspondent pas */
      setUserMessage("Les mots de passe ne correspondent pas.");
    } else {
      setUserMessage("");
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        autoComplete={theButton === "inscription" ? "off" : "on"}
      >
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUserMessage("");
              setUsername(e.target.value);
            }}
            placeholder="Entrez votre identifiant"
            required
            autoComplete={theButton === "inscription" ? "off" : "on"}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setUserMessage("");
              setPassword(e.target.value);
            }}
            placeholder="Entrez votre mot de passe"
            required
            autoComplete={theButton === "inscription" ? "new-password" : "on"}
          />
        </div>
        {theButton === "inscription" && (
          // Pour l'inscription un deuxième champ mot de passe est affiché pour confirmation
          <>
            <div className="form-group">
              <input
                type="password"
                id="secondpassword"
                value={secondpassword}
                onChange={(e) => {
                  setUserMessage("");
                  setSecondPassword(e.target.value);
                }}
                onBlur={verifPasswordBlur}
                placeholder="Confirmez votre mot de passe"
                required
                autoComplete={
                  theButton === "inscription" ? "new-password" : "on"
                }
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setUserMessage("");
                  setEmail(e.target.value);
                }}
                placeholder="Entrez votre mail"
                required
                autoComplete={theButton === "inscription" ? "off" : "on"}
              />
            </div>
          </>
        )}
        <h3>{userMessage}</h3>
        <button type="submit" className="btn-login">
          {theButton === "inscription" ? "Créer un compte" : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
