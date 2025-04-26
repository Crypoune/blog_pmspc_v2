import { React } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faSquareInstagram,
  faSquareFacebook,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Section réseaux sociaux */}
        <div className="footer__section social-links">
          <h3>Retrouve-moi sur</h3>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/pimp_my_spc/?hl=fr"
                aria-label="Ma page Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSquareInstagram} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61572659623246"
                aria-label="Ma page Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSquareFacebook} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@PimpmySpC"
                aria-label="Ma page Youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSquareYoutube} />
              </a>
            </li>
          </ul>
        </div>

        {/* Section des liens légaux */}
        <div className="footer__section footer__links">
          <h3>Informations</h3>
          <ul>
            <li>
              <Link
                to="/legal_notices"
                aria-label="Mentions légales de Pimp my Speed Champions"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                to="/privacy_policy"
                aria-label="Politique de confidentialité de Pimp my Speed Champions"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                to="/terms_of_use"
                aria-label="Conditions générales d'utilisation de Pimp my Speed Champions"
              >
                Conditions générales d'utilisation
              </Link>
            </li>
            <li>
              <Link
                to="/code_of_conduct"
                aria-label="Charte de bonne conduite de Pimp my Speed Champions"
              >
                Charte de bonne conduite
              </Link>
            </li>
          </ul>
        </div>

        {/* Section À propos & Contact */}
        <div className="footer__section about-contact">
          <h3>En savoir plus</h3>
          <ul>
            <li>
              <Link
                to="/about"
                aria-label="À propos de Pimp My Speed Champions"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" aria-label="Page de contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} Pimp my Speed Champions Blog - All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
