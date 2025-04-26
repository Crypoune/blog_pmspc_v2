import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentsList({ id_article, updated = false }) {
  /* Pour récupérer les paramètres de l'URL. exemple: /comment/5 */
  const { id: idUrl } = useParams(); // Récupération via URL
  /* Conversion de l'id d'article de string en entier */
  const paramId = parseInt(idUrl, 10);
  /* On prend l'id en paramètre sinon celui de l'URL */
  const idArticle = id_article || paramId;


  const [Comments, setComments] = useState([]);

  // Pour l'instant, on appelle toujours CommentsList avec l'identifiant d'article !
  const back_req =
    idArticle == 0
      ? "http://localhost:9000/back/v1/comment/list"
      : "http://localhost:9000/back/v1/comment/getall/" + idArticle;
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(back_req, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setComments(data);
      // SELECT comment.id, id_user, id_article, content, comment.publishDate, username
    };
    fetchComments();
  }, [updated]);

  const CommentsContent = ({ content, username, date }) => {
    /* conversion de la date universelle en date locale */
    const d = new Date(date);
    const localeDate = d.toLocaleString();
    return (
      <div className="comment-row">
        <h3>
          De {username} le {localeDate} :
        </h3>
        <p>{content}</p>
      </div>
    );
  };

  return (
    <div className="comments-container">
      <h2>Liste des commentaires</h2>
      <div className="comments-list">
        {Comments.length === 0 ? (
          <p>Aucun commentaire pour l'instant</p>
        ) : (
          Comments.map((comment) => (
            <CommentsContent
              key={String(comment.id)}
              content={comment.content}
              username={comment.username}
              date={comment.publishDate}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsList;
