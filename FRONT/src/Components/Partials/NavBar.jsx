import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="NavBar">
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <img
          className="logo"
          src="/src/assets/img/logo/logo.webp"
          alt="logo Pimp My Speed Champions"
        />
      </Link>
      <div className={`NavBar__links ${isMenuOpen && "NavBar__links--open"}`}>
        <NavLink onClick={() => setIsMenuOpen(false)} to="/">
          Accueil
        </NavLink>
        <NavLink onClick={() => setIsMenuOpen(false)} to="/articles">
          Articles
        </NavLink>
        <NavLink onClick={() => setIsMenuOpen(false)} to="/category">
          Catégories
        </NavLink>
      </div>
      <button
        className={`NavBar__toggle
        ${isMenuOpen && "NavBar__toggle--open"}`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
}

export default NavBar;
