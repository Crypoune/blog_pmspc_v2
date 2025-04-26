import { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import UserCard from "/src/Components/admin/user/UserCard";
import { UserContext } from "/src/context/UserContext";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    setUserMessage("Chargement ...");
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:9000/back/v1/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
    setUserMessage("");
  }, []);

  const DelUser = async (id_user) => {
    try {
      const response = await fetch(
        "http://localhost:9000/user/delete/" + id_user,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
      } else {
      }
      if (response.ok) {
        setUserMessage("Utilisateur supprimé !");
        setUsers((prev) => prev.filter((cat) => cat.id !== id_user));
      } else {
        setUserMessage(
          "Une erreur s'est produite lors de la destruction. Veuillez réessayer."
        );
      }
    } catch (error) {
      setUserMessage(
        "Une erreur s'est produite lors de la destruction. Veuillez réessayer."
      );
    }
  };

  return (
    <main>
      <div className="icon_title">
        <FontAwesomeIcon icon={faTag} />
        <h1>Liste des utilisateurs</h1>
      </div>
      <section className="user-list">
        {userMessage && <h3 className="error">{userMessage}</h3>}

        <div className="user-grid">
          {users.length === 0 ? (
            <p>Aucun utilisateur trouvé</p>
          ) : (
            <>
              <div className="user-item user-header">
                <div className="user-actions">Actions</div>
                <div className="user-username">Nom</div>
                <div className="user-status">Status</div>
                <div className="user-email">Mail</div>
                <div className="user-role">Rôle</div>
                <div className="user-id">ID</div>
              </div>
              {users.map((user) => (
                <UserCard
                  key={String(user.id)}
                  user_id={user.id}
                  username={user.username}
                  email={user.email}
                  role={user.role}
                  status={user.status}
                  act_delete={isAdmin() ? DelUser : null}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default UserList;
