import { useNavigate } from "react-router-dom";
import ReactArticle from "/src/Components/user/Partials/ReactArticle";

function ArticleCard({
  id_article,
  title,
  content,
  image,
  publishDate,
  alt,
  nblove,
  nblike,
}) {
  const navArticle = "/article/" + id_article;
  const navigate = useNavigate();
  const clickArt = () => {
    navigate(navArticle);
  };

  /* conversion de la date universelle en date locale  sans l'heure */
  const d = new Date(publishDate);
  const publishLocaleDate = d.toLocaleString().substring(0, 10);

  const formattedText = (content) => {
    return content.replace(/\n/g, "<br>");
  };

  /* Texte tronqué avec ... pas toujours supporté */

  return (
    <article className="article-card" onClick={clickArt}>
      <header className="article-header">
        <h2>{title}</h2>
      </header>
      <div className="article-body">
        <figure className="article-image">
          <img
            src={
              "/src/assets/img/article_" + id_article + "/" + image + ".webp"
            }
            alt={alt}
          />
        </figure>
        <section className="article-content">
          <p
            className="article-text"
            dangerouslySetInnerHTML={{ __html: formattedText(content) }}
          ></p>
          <p className="article-date">Publié le {publishLocaleDate}</p>
        </section>
      </div>
      <footer className="article-footer">
        <ReactArticle
          edit={false}
          nblike={nblike}
          nblove={nblove}
          actlike={null}
          actlove={null}
        />
      </footer>
    </article>
  );
}

export default ArticleCard;
