import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faGlobe} />
          <h1>À propos de Pimp my Speed Champions</h1>
        </div>
        <article className="text-block">
          <p>
            Bienvenue sur <strong>Pimp my Speed Champions</strong> ! Ici, je
            partage ma passion pour les LEGO Speed Champions en vous présentant
            mes modèles préférés.
          </p>
          <p>
            Vous trouverez des articles sur les sets officiels, mais aussi des
            créations originales imaginées par d'autres passionnés et intégrées
            à ma collection.
          </p>
          <p>
            Mon objectif ? Partager mon amour pour ces petites voitures en LEGO,
            échanger des idées et peut-être vous inspirer à personnaliser vos
            propres modèles !
          </p>
        </article>
      </section>
    </main>
  );
}

export default About;
