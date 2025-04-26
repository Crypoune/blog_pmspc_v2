import { useState } from "react";
import Button from "/src/Components/Partials/Button";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

function ArticleCommentForm({
  id_user,
  id_article,
  lgmax,
  actvalcom,
  actanncom,
}) {
  /* Commentaire saisi */
  const [UserComment, setUserComment] = useState("");
  /* Message à afficher à l'utilisateur */
  const [userMessage, setUserMessage] = useState("");

  /* Taille min et max d'un commentaire */
  const minLength = 5;
  const maxLength = lgmax;

  /* Contrôle  à mesure de la saisie */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (UserComment.length < minLength) {
      setUserMessage("Commentaire ridiculement petit");
    } else {
      if (UserComment.length > maxLength) {
        setUserMessage("Commentaire trop long");
      } else {
        setUserMessage("Envoi du commentaire ...");
        actvalidecomment();
      }
    }
  };

  /* Contrôle au fur et à mesure de la saisie */
  const handleChange = (e) => {
    if (e.target.value.length <= lgmax) {
      setUserComment(e.target.value);
      if (UserComment.length < minLength) {
        setUserMessage("Pas plus de 256 caractères");
      }
      if (UserComment.length > minLength) {
        setUserMessage(
          "Plus que " + (maxLength - UserComment.length) + " caractères"
        );
      }
    }
  };

  /* Enregistrement du commentaire */
  const actvalidecomment = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/back/v1/comment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: UserComment,
            id_user: id_user,
            id_article: id_article,
          }),
        }
      );

      if (response.ok) {
        setUserMessage("Commentaire envoyé");
        /* Comment ajouter une petite pause pour laisser le temps de lire le premier message ? */
        setUserMessage(
          "Il pourra être éventuellement refusé par le modérateur"
        );
        setUserComment("");
        actvalcom();
      }
    } catch (err) {
      setUserMessage("Erreur: Commentaire non enregistré");
    }
  };

  /* Annulation de la saisie */
  const actannulcomment = () => {
    actanncom();
  };

  return (
    <div className="article-comment">
      <h2>Nouveau commentaire</h2>
      <div className="article-comment-area">
        <form className="article-comment-form" onSubmit={handleSubmit}>
          <textarea
            id="user-comment"
            value={UserComment}
            minLength="5"
            maxLength="256"
            onChange={handleChange}
            placeholder="Entrez votre commentaire"
            required
          />
        </form>
        <Button
          buttonLabel="Annuler"
          icon={faXmark}
          variant="secondary"
          onClick={actannulcomment}
        ></Button>
        <Button
          buttonLabel="Valider"
          icon={faCheck}
          variant="secondary"
          onClick={handleSubmit}
        ></Button>
      </div>
      <p className="msg-comment-form">{userMessage}</p>
    </div>
  );
}

export default ArticleCommentForm;
