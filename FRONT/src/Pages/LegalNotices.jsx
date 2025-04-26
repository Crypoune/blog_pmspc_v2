import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function LegalNotices() {
  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faCircleInfo} />
          <h2>Mentions légales de Pimp my Speed Champions</h2>
        </div>
        <article className="text-block">
          <h3>Éditeur du site</h3>
          <p>Nom de l&apos;éditeur : Pimp my Speed Champions</p>
          <p>
            Siège social : Ma chambre à 78490 Montfort l&apos;Amaury, France
          </p>
          <p>Numéro de téléphone : +33 1 34 86 00 00</p>
          <p>Email : contact@pimpmyspeedchampions.com</p>
        </article>
        <article className="text-block">
          <h3>Développement du site</h3>
          <p>Développeur : Arnaud MESSENET</p>
        </article>
        <article className="text-block">
          <h3>Services fournis</h3>
          <p>
            Le blog Pimp my Speed Champions a pour objectif de fournir des
            informations et des contenus concernant les Lego Speed Champions.
            L&apos;éditeur du blog s&apos;efforce de fournir des informations
            aussi précises que possible. Toutefois, il ne peut être tenu
            responsable des omissions, des inexactitudes ou des erreurs dans la
            mise à jour des informations, qu&apos;elles soient dues à son propre
            fait ou à celui de tiers qui lui fournissent ces informations.
          </p>
        </article>
        <article className="text-block">
          <h3>Propriété intellectuelle</h3>
          <p>
            Le contenu du blog Pimp my Speed Champions (textes, images,
            graphismes, logos, vidéos, icônes, etc.) est protégé par les lois
            relatives à la propriété intellectuelle. Toute reproduction,
            représentation, modification, publication, adaptation, totale ou
            partielle de ces éléments, quel que soit le moyen ou le procédé
            utilisé, est interdite, sauf autorisation écrite préalable de
            l&apos;éditeur du blog.
          </p>
        </article>
        <article className="text-block">
          <h3>Données personnelles</h3>
          <p>
            Le blog Pimp my Speed Champions peut collecter des données
            personnelles dans le cadre de l&apos;utilisation du blog,
            conformément au Règlement Général sur la Protection des Données
            (RGPD). Ces données incluent principalement [nom, email, etc.].
          </p>
          <p>
            Pour plus de détails sur la collecte, l&apos;utilisation et la
            protection de vos données personnelles, veuillez consulter notre{" "}
            <Link to="/privacy_policy">Politique de Confidentialité</Link>.
          </p>
        </article>
        <article className="text-block">
          <h3>Utilisation des cookies</h3>
          <p>
            Le blog Pimp my Speed Champions utilise des cookies pour améliorer
            votre expérience utilisateur et pour réaliser des statistiques de
            fréquentation. Vous pouvez configurer vos préférences dans les
            paramètres de votre navigateur ou via notre politique de cookies.
          </p>
        </article>
        <article className="text-block">
          <h3>Crédits</h3>
          <p>
            Design et développement par Arnaud MESSENET. Illustrations et images
            créées par moi-même, l&apos;éditeur du blog.
          </p>
        </article>
      </section>
    </main>
  );
}

export default LegalNotices;
