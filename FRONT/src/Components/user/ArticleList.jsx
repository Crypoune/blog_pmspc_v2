import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import ArticleCard from "/src/Components/user/Partials/ArticleCard";
import Button from "/src/Components/Partials/Button";
import { UserContext } from "/src/context/UserContext";

function ArticleList() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);
  /* Liste des articles */
  const [articles, setArticles] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  /* Pour récupérer les paramètres de l'URL. exemple: articles?idcat=5&nomcat=ford */
  const [searchParams] = useSearchParams();
  /* Conversion en entier de l'id de catégorie qui est une string */
  const idCat = parseInt(searchParams.get("idcat"), 10);
  /* Récupération du nom de la catégorie dans l'URL */
  const nomCat = idCat > 0 ? searchParams.get("nomcat") : "";
  /* Récupération du pattern dans l'URL */
  const pattern = searchParams.get("pattern");

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(
        "http://localhost:9000/back/v1/article/alist",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setArticles(data);
      if (idCat > 0) {
        /* Filtrer les articles pour ne conserver que ceux qui correspondent à idCat */
        const filteredArticles = data.filter(
          (article) => article.id_category == idCat
        );
        /* Remplacer la liste des articles par la liste filtrée */
        setArticles(filteredArticles);
      }
      if (pattern != null && pattern != "") {
        const strRegex = new RegExp(pattern, "i");

        const filteredArticles = data.filter((article, index) => {
          const matchInTitle = strRegex.test(article.title || "");
          const matchInContent = strRegex.test(article.content || "");

          return matchInTitle || matchInContent;
        });

        /* Remplacer la liste des articles par la liste filtrée */
        setArticles(filteredArticles);
      }
    };
    fetchArticles();
  }, [idCat, pattern]);

  const act_create = (e) => {
    if (isAdmin()) {
      setArticles([]);
      navigate("/articleFormCreate/0");
    } else {
      setUserMessage("Modification interdite");
    }
  };

  let titre = "Liste des articles";
  if (pattern != null && pattern != "") {
    titre = titre + " - Filtre " + pattern;
  }
  if (idCat > 0) {
    titre = titre + " - Catégorie " + nomCat;
  }

  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faNewspaper} />
          <h1> {titre} </h1>
        </div>
        {userMessage != "" && <p>{userMessage}</p>}
        {isAdmin() && (
          <Button
            buttonLabel="Ajouter un article"
            icon={faPlus}
            variant="secondary"
            onClick={act_create}
          />
        )}
        {articles.length === 0 ? (
          <p>Aucun article disponible</p>
        ) : (
          articles.map((article) => (
            <article key={String(article.id)}>
              <ArticleCard
                id_article={article.id}
                title={article.title}
                content={article.content}
                image={article.image}
                alt={article.alt}
                id_category={article.id_category}
                publishDate={article.publishDate}
                nblove={article.nblove}
                nblike={article.nblike}
              />
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default ArticleList;
