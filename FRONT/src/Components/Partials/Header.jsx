import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "/src/context/UserContext";
import NavBar from "/src/Components/Partials/NavBar";
import SearchBar from "/src/Components/Partials/SearchBar";
import Button from "/src/Components/Partials/Button";
import {
  faChartBar,
  faUser,
  faRightFromBracket,
  faUserPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navigate = useNavigate();
  const { isAdmin, isLogged, userLogout } = useContext(UserContext);

  const clickDashboard = () => {
    navigate("/dashboard");
  };

  const clickUserProfile = () => {
    navigate("/userprofile");
  };

  const clickLogout = () => {
    userLogout();
    navigate("/");
  };

  const clickInscription = () => {
    navigate("/login?b=inscription");
  };

  const clickConnection = () => {
    navigate("/login?b=connection");
  };

  const handleSearch = (pattern) => {
    const navArticle = "/articles/pattern?pattern=" + pattern;
    navigate(navArticle);
  };

  return (
    <header className="header">
      <NavBar />
      <div className="header__bottom">
        <SearchBar onSearch={handleSearch} />
        <div className="header__buttons">
          {isLogged() ? (
            <>
              {isAdmin() ? (
                <Button
                  buttonLabel="Dashboard"
                  ariaLabel="Dashboard"
                  icon={faChartBar}
                  variant="primary"
                  onClick={clickDashboard}
                />
              ) : (
                <Button
                  buttonLabel="Mon profil"
                  ariaLabel="Mon profil"
                  icon={faUser}
                  variant="primary"
                  onClick={clickUserProfile}
                />
              )}

              <Button
                buttonLabel="Se déconnecter"
                ariaLabel="Se déconnecter"
                icon={faRightFromBracket}
                variant="primary"
                onClick={clickLogout}
              />
            </>
          ) : (
            <>
              <Button
                buttonLabel="S'inscrire"
                ariaLabel="S'inscrire"
                icon={faUserPlus}
                variant="primary"
                onClick={clickInscription}
              />
              <Button
                buttonLabel="Se connecter"
                ariaLabel="Se connecter"
                icon={faRightToBracket}
                variant="primary"
                onClick={clickConnection}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
