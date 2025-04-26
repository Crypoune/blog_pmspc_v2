import { useContext } from "react";
import { UserContext } from "/src/context/UserContext";
import Button from "/src/Components/Partials/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faUser } from "@fortawesome/free-solid-svg-icons";

function TermsOfUse() {
  const navigate = useNavigate();
  const { isLogged } = useContext(UserContext);

  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faShieldHalved} />
          <h2>
            Conditions générales d&apos;Utilisation de Pimp my Speed Champions
          </h2>
        </div>
        <article className="text-block">
          <p>
            En utilisant le blog Pimp my Speed Champions, vous acceptez les
            conditions d’utilisation suivantes.
          </p>
        </article>
        <article className="text-block">
          <h3>Propriété intellectuelle</h3>
          <p>
            Le contenu de ce blog, y compris, mais sans s'y limiter, les textes,
            images, logos et vidéos, est la propriété de Pimp my Speed Champions
            et est protégé par les lois sur le droit d’auteur.
          </p>
          <p>
            Toute reproduction, distribution, modification ou utilisation non
            autorisée du contenu est strictement interdite sans l’accord
            préalable écrit de Pimp my Speed Champions.
          </p>
        </article>
        <article className="text-block">
          <h3>Utilisation du blog</h3>
          <p>
            Vous vous engagez à ne pas utiliser ce blog à des fins illégales.
            Vous devez respecter toutes les lois et réglementations locales,
            nationales et internationales applicables.
          </p>
        </article>
        <article className="text-block">
          <h3>Limitation de responsabilité</h3>
          <p>
            Pimp my Speed Champions ne sera pas responsable des dommages
            directs, indirects, consécutifs, spéciaux ou autres qui pourraient
            résulter de l’utilisation de ce blog, même si la possibilité de tels
            dommages a été portée à sa connaissance.
          </p>
        </article>
        <article className="text-block">
          <p>
            Ces conditions peuvent être mises à jour à tout moment. En
            continuant à naviguer sur ce blog, vous acceptez ces termes et
            conditions.
          </p>
        </article>
        {isLogged() && (
          <article className="text-block">
            <h3>Vos données personnelles</h3>
            <p>
              Vous avez accès à vos données personnelles qui sont limitées à
              votre adresse mail, votre mot de passe et vos commentaires sur nos
              articles. Vous pouvez fermer votre compte à tout moment et aussi
              si vous le souhaitez nous demander par mail d&apos;effacer vos
              commentaires sur nos articles.
            </p>
            <Button
              buttonLabel="Infos personnelles"
              icon={faUser}
              variant="primary"
              onClick={() => {
                navigate("/userprofile");
              }}
            />
          </article>
        )}
      </section>
    </main>
  );
}

export default TermsOfUse;
