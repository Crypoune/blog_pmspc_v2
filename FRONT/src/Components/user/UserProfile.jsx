import { useContext } from "react";
import { UserContext } from "/src/context/UserContext";
import Settings from "/src/Components/user/Partials/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {
  const { isLogged } = useContext(UserContext);

  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faUser} />
          <h1>Mon profil</h1>
        </div>
      </section>
      {isLogged() && <Settings />}
    </main>
  );
}

export default UserProfile;
