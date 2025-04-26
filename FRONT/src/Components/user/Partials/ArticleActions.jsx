import { useContext } from "react";
import { UserContext } from "/src/context/UserContext";
import { faTrash, faEdit, faComment } from "@fortawesome/free-solid-svg-icons";
import ReactArticle from "/src/Components/user/Partials/ReactArticle";
import Button from "/src/Components/Partials/Button";

function ArticleActions({
  edit,
  id_article,
  nblike,
  nblove,
  actmodify,
  actdelete,
  actcomment,
  actlike,
  actlove,
}) {
  const { isLogged, isAdmin } = useContext(UserContext);

  return (
    <div className="article-actions">
      <div className="user-actions">
        <ReactArticle
          edit={edit}
          nblike={nblike}
          nblove={nblove}
          actlike={actlike}
          actlove={actlove}
        />
        {isLogged() && (
          <Button
            ariaLabel="Commenter"
            buttonLabel="Commenter"
            icon={faComment}
            variant="secondary"
            onClick={actcomment}
          />
        )}
      </div>
      {isAdmin() && (
        <div className="admin-actions">
          <Button
            ariaLabel="Modifier l'article"
            buttonLabel="Modifier l'article"
            icon={faEdit}
            variant="secondary"
            onClick={actmodify}
          />
          <Button
            ariaLabel="Supprimer l'article"
            buttonLabel="Supprimer l'article"
            icon={faTrash}
            variant="secondary"
            onClick={actdelete}
          />
        </div>
      )}
    </div>
  );
}

export default ArticleActions;
