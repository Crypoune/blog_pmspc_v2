import { useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "/src/Components/Partials/Button";
import { UserContext } from "/src/context/UserContext";

function UserCard({
  user_id,
  username,
  email,
  role,
  status,
  act_delete = null,
}) {
  const { isAdmin } = useContext(UserContext);

  const actDelUser = (event) => {
    event.stopPropagation();
    if (
      window.confirm(
        `Voulez-vous vraiment supprimer cet utilisateur ${username} (id=${user_id}) ?`
      )
    ) {
      act_delete(user_id);
    }
  };

  return (
    <div className="user-item user-row">
      {isAdmin() && (
        <div className="user-actions">
          {user_id > 1 && (
            <Button
              ariaLabel="Supprimer l'utilisateur"
              icon={faTrash}
              variant="secondary"
              onClick={actDelUser}
            />
          )}
        </div>
      )}
      <div className="user-username">{username}</div>
      <div className="user-status">{status}</div>
      <div className="user-email">{email}</div>
      <div className="user-role">{role}</div>
      <div className="user-id">{user_id}</div>
    </div>
  );
}

export default UserCard;
