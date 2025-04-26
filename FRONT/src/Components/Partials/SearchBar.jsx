import { useState } from "react";
import Button from "/src/Components/Partials/Button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Appelle la fonction passée en prop
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        id="search-bar-input"
        aria-label="Recherche de texte dans les articles"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Saisissez un texte..."
        className="search-bar__input"
      />
      <Button
        buttonLabel="Rechercher"
        ariaLabel="Rechercher un texte dans les articles"
        icon={faMagnifyingGlass}
        variant="secondary"
        onClick={handleSearch}
        className="search-bar__button"
      />
    </form>
  );
};

export default SearchBar;
