import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

function PrivacyPolicy() {
  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faUserShield} />
          <h2>Politique de Confidentialité de Pimp my Speed Champions</h2>
        </div>
        <article className="text-block">
          <p>
            Nous respectons votre vie privée et nous nous engageons à la
            protéger. Cette politique de confidentialité explique comment nous
            recueillons, utilisons et protégeons vos informations personnelles
            lorsque vous utilisez le blog Pimp my Speed Champions.
          </p>
        </article>
        <article className="text-block">
          <h3>Collecte d&apos;informations</h3>
          <p>
            Nous recueillons des informations lorsque vous interagissez avec
            notre blog, par exemple lorsque vous vous inscrivez à la newsletter,
            laissez un commentaire ou remplissez un formulaire de contact.
          </p>
          <p>
            Les informations recueillies incluent principalement votre nom et
            votre adresse e-mail. Nous ne collectons pas de données sensibles
            telles que votre adresse physique ou numéro de téléphone.
          </p>
        </article>
        <article className="text-block">
          <h3>Utilisation des informations</h3>
          <p>Les informations que nous recueillons sont utilisées pour :</p>
          <ul>
            <li>
              Personnaliser votre expérience et répondre à vos besoins
              individuels
            </li>
            <li>Améliorer le contenu et la navigation du blog</li>
            <li>
              Vous envoyer des mises à jour ou des informations pertinentes sur
              le blog, si vous vous êtes inscrit à la newsletter
            </li>
            <li>
              Répondre à vos questions ou commentaires via notre formulaire de
              contact
            </li>
          </ul>
        </article>
        <article className="text-block">
          <h3>Protection des informations</h3>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour
            préserver la sécurité de vos informations personnelles et éviter
            tout accès non autorisé. Cependant, nous vous informons que, malgré
            nos efforts, aucune méthode de transmission sur Internet ou de
            stockage électronique n'est totalement sécurisée.
          </p>
        </article>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
