import { useEffect, useState, useContext } from "react";
import { UserContext } from "/src/context/UserContext";
import { verifEmail } from "/src/Components/utils/verifMail.js";
import { verifPassword } from "/src/Components/utils/verifPassword.js";
/// import AuthProvider from "/src/context/AuthContext";
import Button from "/src/Components/Partials/Button";

function Settings() {
  const { isAdmin, userId, userName, userMail, setCurrentUser } =
    useContext(UserContext);

  // quand je fusionnerai AuthContext et UserContext...
  // const { setAuth } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState(userMail());
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      const response = await fetch(
        `http://localhost:9000/back/v1/user/${userId()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setUserInfo(data);
    }
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <p role="status">Chargement...</p>;
  }

  const controlValues = () => {
    let isValid = true;

    if (changePassword) {
      if (password === "") {
        setUserMessage("Le mot de passe ne peut pas être vide.");
        isValid = false;
      } else if (password !== secondpassword) {
        setUserMessage("Les mots de passe ne correspondent pas.");
        isValid = false;
      } else if (!verifPassword(password)) {
        setUserMessage(
          "Utiliser au moins 8 caractères dont un chiffre, une minuscule, une majuscule et un caractère spécial (*?@!%$&)"
        );
        isValid = false;
      }
    }

    if (!verifEmail(email)) {
      setUserMessage("Ce n'est pas une adresse mail valide.");
      isValid = false;
    }

    if (isValid) {
      setUserMessage(""); // Nettoie l'ancien message
    }

    return isValid;
  };

  const onVal = () => {
    if (controlValues()) {
      onSubmitUpdate();
    }
  };

  const onSubmitUpdate = async () => {
    setUserMessage("Enregistrement des modifications");
    try {
      const response = await fetch(
        `http://localhost:9000/back/v1/auth/update/${userId()}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            mail: email,
            password: password,
            username: userName(),
            change: changePassword,
            id_user: userId(),
          }),
        }
      );

      if (response.ok) {
        setPassword("");
        setSecondPassword("");
        setCurrentUser((prevCurrentUser) => ({
          ...prevCurrentUser,
          mail: email,
        }));
        setUserMessage("Modifications enregistrées");
      } else {
        setUserMessage("Modifications refusées");
      }
    } catch (err) {
      setUserMessage("Erreur réseau lors de la modification");
      setPassword("");
      setSecondPassword("");
    }
  };

  return (
    <section id="user_settings" className="settings-container">
      <div className="dashboard-area">
        <h3>Mise à jour de vos informations</h3>
        <section>
          <div>
            <div className="form-group">
              {isAdmin() && <b>Administrateur</b>}
              <label htmlFor="username">Nom : </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={userName()}
                readOnly
                autoComplete="off"
              />
              <label htmlFor="email"> Adresse mail : </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => {
                  setUserMessage("");
                  setEmail(e.target.value);
                }}
                placeholder="Entrez votre email"
                autoComplete="on"
              />
            </div>
            <label id="change-pwd">
              <input
                type="checkbox"
                id="change-pwd-checkbox"
                checked={changePassword}
                onChange={(e) => {
                  setUserMessage("");
                  setChangePassword(!changePassword);
                }}
              />
              Changer le mot de passe
            </label>
            {changePassword && (
              <div className="form-group">
                <label htmlFor="username">Nouveau mot de passe : </label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => {
                    setUserMessage("");
                    setPassword(e.target.value);
                  }}
                  placeholder="Entrez votre mot de passe"
                  autoComplete="off"
                />
                <input
                  id="secondpassword"
                  type="password"
                  className="form-input"
                  value={secondpassword}
                  onChange={(e) => {
                    setUserMessage("");
                    setSecondPassword(e.target.value);
                  }}
                  placeholder="Confirmez votre mot de passe"
                  autoComplete="off"
                />
              </div>
            )}
          </div>
          <p>{userMessage}</p>
          <div className="settings-buttons">
            <Button
              key="Valider"
              buttonLabel="Enregistrer les modifications"
              variant="primary"
              onClick={onVal}
            />
          </div>
        </section>
      </div>
    </section>
  );
}

export default Settings;
