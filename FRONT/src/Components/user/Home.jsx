import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "/src/Components/user/Partials/ArticleCard";
import WebRessources from "/src/Components/Partials/WebResources";

const RecentArticles = ({ how_many = "1" }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(
        "http://localhost:9000/back/v1/article/recent/" + how_many,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <section id="recent_article">
      <h1>Dernier article en ligne</h1>
      {articles.length > 0 &&
        articles.map((article) => (
          <ArticleCard
            key={String(article.id)}
            id_article={article.id}
            title={article.title}
            content={article.content}
            image={article.image}
            alt={article.alt}
            publishDate={article.publishDate}
            nblove={article.nblove}
            nblike={article.nblike}
          />
        ))}
    </section>
  );
};

function Home() {
  return (
    <>
      <header id="home_banner" role="banner">
        <img
          src="/src/assets/img/banner.webp"
          srcSet="
          /src/assets/img/banner.webp 2000w, 
          /src/assets/img/banner.webp 3000w, 
          /src/assets/img/banner.webp 4000w"
          alt="Voitures Lego Speed Champions exposé en ligne"
        />
        <h2>
          Speed Champions : <br />
          ma passion roule à toute vitesse !
        </h2>
      </header>
      <main>
        <section className="main-section">
          <div id="home_blog_last_article">
            <section id="blog_presentation">
              <h1>Présentation du blog</h1>
              <div id="blog-description" className="text-block">
                <p>
                  Pimp My Speed Champions est un blog dédié aux fans de Lego
                  Speed Champions. Vous y découvrirez les modèles officiels,
                  mais aussi des créations originales (MOC) imaginées et
                  construites avec passion. Le blog met en avant des techniques
                  de personnalisation uniques, comme des pièces en 3D (surtout
                  des jantes), des stickers faits maison, ou encore des pièces
                  chromées pour des finitions spectaculaires. Vous y trouverez
                  parfois des pièces alternatives non-Lego, utilisées uniquement
                  pour leurs couleurs inédites absentes du catalogue Lego.
                </p>
                <p>
                  N'hésitez pas à vous connecter pour pouvoir poster vos
                  commentaires ou Liker mes articles. Je vous invite à en savoir
                  plus en cliquant <Link to="/about">ici</Link>.
                </p>
              </div>
            </section>
            <RecentArticles how_many="1" />
          </div>
          <WebRessources />
        </section>
      </main>
    </>
  );
}

export default Home;
