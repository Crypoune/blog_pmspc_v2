import { useEffect, useState } from "react";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "/src/Components/Partials/Button";

function CategoryForm({
  id_category = 0,
  name_category = "",
  actvalcat = null,
  actanncat = null,
}) {
  /* Catégorie saisie */
  const [CategoryName, setCategoryName] = useState("");
  const [IsModified, setIsModified] = useState(false);
  const lgmax = 60;

  /* Contrôle au fur et à mesure de la saisie */
  const handleChange = (e) => {
    if (e.target.value.length <= lgmax) {
      setCategoryName(e.target.value);
    }
  };

  useEffect(() => {
    setCategoryName(name_category);
  }, [name_category]);

  /* Enregistrement de la catégorie */
  const updateCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/back/v1/category/update/${id_category}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: CategoryName,
            label: CategoryName,
            id_category: id_category,
          }),
        }
      );

      if (response.ok) {
        setCategoryName(""); // Réinitialise l'input
        actvalcat(id_category); // Mettre à jour la liste après modification
      }
    } catch (err) {}
  };

  const handleSubmit = () => {
    if (id_category == 0) {
      actvalcat(0, CategoryName);
    } else {
      updateCategory(id_category);
    }
  };

  return (
    <div className="edit-category-item">
      <input
        id="categoryname"
        value={CategoryName}
        minLength="5"
        maxLength="60"
        onChange={handleChange}
        placeholder="Nom de la catégorie"
        required
      />
      <Button
        buttonLabel="Annuler"
        icon={faXmark}
        variant="secondary"
        onClick={actanncat}
      />
      <Button
        buttonLabel="Valider"
        icon={faCheck}
        variant="secondary"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default CategoryForm;
