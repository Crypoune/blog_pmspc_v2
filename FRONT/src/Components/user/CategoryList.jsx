import { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryCard from "/src/Components/user/Partials/CategoryCard";
import { UserContext } from "/src/context/UserContext";
import CategoryForm from "/src/Components/admin/category/CategoryForm";
import Button from "/src/Components/Partials/Button";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [OpenForm, setOpenForm] = useState(false);
  const { isAdmin } = useContext(UserContext);
  const [InputCategory, setInputCategory] = useState("");
  const [InputIdCategory, setInputIdCategory] = useState(0);
  const [IsModified, setIsModified] = useState(false);

  useEffect(() => {
    setUserMessage("Chargement ...");
    const fetchCategories = async () => {
      const response = await fetch(
        "http://localhost:9000/back/v1/category/list", // J'ai vu que j'avais oublié de mettre la méthode GET
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
    setUserMessage("");
    setIsModified(false);
  }, [IsModified]);

  const OpenFormCategory = (id, name) => {
    if (id > 0) {
      setInputCategory(name);
      setInputIdCategory(id);
    } else {
      setInputCategory("");
      setInputIdCategory(0);
    }
    // Ouvrir la section formulaire
    setOpenForm(true);
  };

  const CloseFormCategory = () => {
    setOpenForm(false);
  };

  const CreatedCategory = (id_categorie, name_category) => {
    categories.push([{ id: id_categorie, name: name_category }]);
    setIsModified(true);
    setOpenForm(false);
  };

  const UpdatedCategory = (id_cat, name_cat) => {
    if (id_cat == 0) {
      /* Reste à créer la nouvelle catégorie */
      handleSubmit(name_cat);
    } else {
      /* Rien à faire la catégorie a été modifiée par CategoryForm */
      setIsModified(true);
      setOpenForm(false);
    }
  };

  const act_create = () => {
    setOpenForm(true);
  };

  /* Enregistrement de la catégorie */
  const handleSubmit = async (name_cat) => {
    try {
      const response = await fetch(
        "http://localhost:9000/back/v1/category/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ label: name_cat }),
        }
      );

      if (response.ok) {
        const data = await response.json(); // Récupération du JSON
        CreatedCategory(data.id, name_cat);
      }
    } catch (err) {}
  };

  const DelCategory = async (id_categorie) => {
    try {
      const response = await fetch(
        "http://localhost:9000/category/delete/" + id_categorie,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
      }
      if (response.ok) {
        window.alert("Catégorie supprimée !");
        setCategories((prev) => prev.filter((cat) => cat.id !== id_categorie));
      } else {
        setUserMessage(
          "Une erreur s'est produite lors de la destruction. Veuillez réessayer."
        );
      }
    } catch (error) {
      setUserMessage(
        "Une erreur s'est produite lors de la destruction. Veuillez réessayer."
      );
    }
  };

  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faTag} />
          <h1>Liste des cat&eacute;gories</h1>
        </div>
        {isAdmin() && (
          <div>
            <Button
              buttonLabel="Ajouter une catégorie"
              ariaLabel="Ajouter une catégorie"
              icon={faPlus}
              variant="secondary"
              onClick={act_create}
            />
            {userMessage != "" && <h2>{userMessage}</h2>}
          </div>
        )}
        <div className="categories-list">
          {OpenForm && (
            <CategoryForm
              id_category={InputIdCategory}
              name_category={InputCategory}
              actvalcat={UpdatedCategory}
              actanncat={CloseFormCategory}
            />
          )}
          {categories.length === 0 ? (
            <p>Aucune categorie disponible</p>
          ) : (
            categories.map((categorie) => (
              <CategoryCard
                key={String(categorie.id)}
                id_category={categorie.id}
                name_category={categorie.name}
                act_delete={isAdmin() ? DelCategory : null}
                act_openform={isAdmin() ? OpenFormCategory : null}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default CategoryList;
