import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "/src/context/UserContext";
import Slider from "../Partials/Slider";
import ArticleCommentForm from "/src/Components/Partials/ArticleCommentForm";
import ArticleActions from "/src/Components/user/Partials/ArticleActions";
import CommentsList from "/src/Components/user/Partials/CommentsList";

function Article() {
  const { userId, isAdmin, isLogged } = useContext(UserContext);
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [nbLike, setNbLike] = useState(0);
  const [nbLove, setNbLove] = useState(0);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaAlts, setMediaAlts] = useState([]);
  const [OpenCommentSection, setOpenCommentSection] = useState(false);
  const [IsUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  /* recherche de l'article d'identifiant id par requête au BACK */
  if (id > 0) {
    useEffect(() => {
      const fetchArticle = async () => {
        const response = await fetch(
          "http://localhost:9000/back/v1/article/" + id,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setArticle(data);
        setNbLike(data.nblike);
        setNbLove(data.nblove);
        setMediaFiles(data.media_files);
        setMediaAlts(data.media_alts);
      };
      fetchArticle();
      setIsUpdated(false);
    }, [IsUpdated]);
  } else {
    return [];
  }

  if (article.id === undefined) {
    /* L'article n'existe pas ou n'est pas encore retourné par le BACK */
    return <> </>;
  }

  let id_user = userId();
  /* Conversion de la date universelle en date locale sans les secondes */
  const d = new Date(article.publishDate);
  const publishLocaleDate = d.toLocaleString().substring(0, 16);

  const formattedText = (content) => {
    return content.replace(/\n/g, "<br>").replace(/\\/g, "\\");
  };

  function artAnnCom() {
    setOpenCommentSection(false);
  }

  function artValCom() {
    setOpenCommentSection(false);
    setIsUpdated(true);
  }

  const artComment = () => {
    setOpenCommentSection(true);
  };

  const artModify = () => {
    isAdmin()
      ? navigate("/articleForm/" + id)
      : window.alert("Modification interdite");
  };

  const artDelete = () => {
    isAdmin() ? navigate("/articleDel" + id) : window.alert("Action interdite");
  };

  const updateReaction = async (reaction) => {
    try {
      const response = await fetch(
        `http://localhost:9000/back/v1/reaction/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id_user: id_user,
            id_article: article.id,
            reaction_type: reaction,
          }),
        }
      );

      if (response.ok) {
        setIsUpdated(true);
      }
    } catch (err) {}
  };

  const artLike = () => {
    updateReaction(1);
  };

  const artLove = () => {
    updateReaction(2);
  };

  /* Affichage de l'article et des boutons d'actions */
  return (
    <article className="article-edit">
      <h1 className="article-title-edit">{article.title}</h1>
      {isAdmin() && <h4>(Id: {article.id})</h4>}
      <p
        className="article-category-edit"
        onClick={() => {
          navigate("/articles/pattern?pattern=" + article.category);
        }}
      >
        Catégorie: {article.category}
      </p>
      <p className="article-date">
        {"Date de publication : " + publishLocaleDate}
      </p>
      <Slider
        artId={article.id}
        mediaFiles={mediaFiles}
        mediaAlts={mediaAlts}
      />
      <p
        className="article-text-edit"
        dangerouslySetInnerHTML={{ __html: formattedText(article.content) }}
      ></p>

      <ArticleActions
        edit={true}
        id_article={article.id}
        actmodify={artModify}
        actdelete={artDelete}
        actcomment={artComment}
        actlike={artLike}
        actlove={artLove}
        nblike={nbLike}
        nblove={nbLove}
      />
      {isLogged() && (
        <>
          {OpenCommentSection && (
            <ArticleCommentForm
              id_user={id_user}
              id_article={article.id}
              lgmax={256}
              actanncom={artAnnCom}
              actvalcom={artValCom}
            />
          )}
          <CommentsList id_article={article.id} updated={IsUpdated} />
        </>
      )}
    </article>
  );
}

export default Article;
