import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

function CodeOfConduct() {
  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faScaleBalanced} />
          <h1>Charte de bonne conduite</h1>
        </div>
        <article className="text-block">
          <p>
            Ce blog est un espace dédié à l'univers des LEGO Speed Champions, où
            passionnés et curieux peuvent partager, commenter et échanger leurs
            idées. Afin de garantir une ambiance conviviale et respectueuse,
            nous vous invitons à respecter cette charte de bonne conduite.
          </p>
        </article>
        <article className="text-block">
          <h3>Respect et bienveillance</h3>
          <p>
            Soyez courtois et respectueux envers les autres utilisateurs. Les
            insultes, propos diffamatoires, discriminatoires ou incitant à la
            haine ne seront pas tolérés. Les débats sont les bienvenus, mais
            toujours dans le respect de chacun.
          </p>
        </article>
        <article className="text-block">
          <h3>Contenu des commentaires</h3>
          <p>
            Assurez-vous que vos commentaires sont en lien avec le sujet de
            l'article. Le spam, la publicité ou la promotion excessive de sites
            externes ne sont pas autorisés. Pas de contenu illégal, offensant ou
            inapproprié.
          </p>
        </article>
        <article className="text-block">
          <h3>Responsabilité des utilisateurs</h3>
          <p>
            Chaque utilisateur est responsable du contenu qu'il publie. Aucune
            modération ne sera faite avant publication, mais une surveillance
            sera effectuée régulièrement. Tout commentaire ne respectant pas
            cette charte pourra être supprimé sans préavis.
          </p>
        </article>
        <article className="text-block">
          <h3>Protection de la vie privée</h3>
          <p>
            Ne publiez pas d'informations personnelles (adresse, numéro de
            téléphone, etc.). Respectez la vie privée des autres membres.
          </p>
        </article>
        <article className="text-block">
          <h3>Signalement et modération</h3>
          <p>
            Si vous repérez un commentaire inapproprié, vous pouvez le signaler
            à l'administrateur du blog. L'équipe de Pimp my Speed Champions se
            réserve le droit de modérer ou de supprimer tout contenu jugé
            inapproprié.
          </p>
        </article>
        <article className="text-block">
          <p>
            En participant à ce blog, vous acceptez de respecter cette charte.
            Merci de faire de Pimp my Speed Champions un espace agréable et
            passionnant pour tous les fans de LEGO Speed Champions !
          </p>
        </article>
      </section>
    </main>
  );
}

export default CodeOfConduct;
