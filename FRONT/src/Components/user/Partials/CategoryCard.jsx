import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "/src/Components/Partials/Button";
import { UserContext } from "/src/context/UserContext";

function CategoryCard({
  id_category = 0,
  name_category = "",
  act_delete = null,
  act_openform = null,
}) {
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);

  const clickCat = () => {
    const navArticle =
      "/articles?idcat=" + id_category + "&nomcat=" + name_category;
    navigate(navArticle);
  };

  const actUpdtCat = (event) => {
    event.stopPropagation();
    act_openform && act_openform(id_category, name_category);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Pour un défilement fluide
    });
  };

  const actDelCat = (event) => {
    event.stopPropagation();
    if (
      window.confirm(
        `Voulez-vous vraiment supprimer la catégorie ${name_category} (id=${id_category}) ?`
      )
    ) {
      act_delete && act_delete(id_category);
    }
  };

  return (
    <div className="category-item" onClick={clickCat}>
      {isAdmin() && (
        <div className="categoryButtons">
          <Button
            buttonLabel="Modifier"
            ariaLabel="Modifier la catégorie"
            icon={faEdit}
            variant="secondary"
            onClick={actUpdtCat}
          />
          {id_category > 1 && (
            <Button
              buttonLabel="Supprimer"
              ariaLabel="Supprimer la catégorie"
              icon={faTrash}
              variant="secondary"
              onClick={actDelCat}
            />
          )}
        </div>
      )}
      <h2 className="category-name">{name_category}</h2>
    </div>
  );
}

export default CategoryCard;
