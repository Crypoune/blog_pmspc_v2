import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "/src/context/UserContext";
import Button from "/src/Components/Partials/Button";
import ArticleMedia from "/src/Components/Admin/article/ArticleMedia";

function ArticleForm() {
  const { id } = useParams();
  const id_article = id && !isNaN(Number(id)) ? Number(id) : 0;
  const navigate = useNavigate();
  const { isAdmin, userId } = useContext(UserContext);
  const [IsModified, setIsModified] = useState(false);
  const [IsLoadingCategories, setIsLoadingCategories] = useState(false);
  const [IsLoadingArticle, setIsLoadingArticle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ShowMedia, setShowMedia] = useState(false);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    alt: "",
    id_category: 0,
    id: id_article,
  });
  const [Categories, setCategories] = useState([]);

  /* Message à afficher à l'utilisateur */
  const [userMessage, setUserMessage] = useState("");
  const [FormData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    alt: "",
    id_category: 0,
  });

  // Récupération de l'article pour remplir le formulaire ou initialisation à vide
  useEffect(() => {
    if (article.id > 0) {
      /* Recherche dans la base de l'article  à modifié d'identifiant id */
      setUserMessage("Chargement de l'article");
      const fetchArticle = async () => {
        try {
          setIsLoadingArticle(true);
          const url = "http://localhost:9000/back/v1/article/" + article.id;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.media_files == null || data.media_files[0] == null) {
              data.media_files[0] = data.image;
            }
            if (data.media_alts == null || data.media_alts[0] == null) {
              data.media_alts[0] = data.alt;
            }
            setArticle(data);
            setFormData({
              title: article.title,
              content: article.content,
              category: article.category,
              id_category: article.id_category,
              image: article.image,
              alt: article.alt,
            });
            setIsModified(false);
          }
        } catch (error) {
          setUserMessage("Erreur réseau lors de la récupération de l'article");
        } finally {
          setIsLoadingArticle(false);
          setUserMessage("");
        }
      };
      fetchArticle();
    } else {
      // Mode création : on réinitialise le formulaire
      setFormData({
        title: "",
        content: "",
        category: "",
        id_category: 0,
        image: "",
        alt: "",
      });
    }
  }, [article.id, Categories]);

  // Récupération des catégories (toujours nécessaire)
  useEffect(() => {
    setUserMessage("Chargement des catégories ...");
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const url = "http://localhost:9000/back/v1/category/list";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          setFormData((prev) => ({
            ...prev,
            id_category: data[0].id,
            category: data[0].name,
          }));
        } else {
          setUserMessage("Erreur lors de la récupération des catégories");
        }
      } catch (error) {
        setUserMessage("Erreur réseau lors de la récupération des catégories");
      } finally {
        setIsLoadingCategories(false);
        setUserMessage("");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (Categories.length > 0 && article.id === 0) {
      setFormData((prev) => ({
        ...prev,
        id_category: Categories[0],
        category: Categories[0].name,
      }));
    }
  }, [Categories, article.id]);

  /* Handler pour la validation du formulaire */
  const CreateOrModif = async () => {
    if (article.id > 0) {
      // Traitement de la modification
      if (isSubmitting) return; // Empêche une double création en cas de render
      setIsSubmitting(true);
      setIsModified(true);
      try {
        const response = await fetch(
          "http://localhost:9000/back/v1/article/update/" + article.id,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              ...FormData, // Copie tous les champs de FormData
              id: article.id,
            }),
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setArticle(data);
          setFormData({
            ...FormData,
            title: data.title,
            content: data.content,
            image: data.image,
            alt: data.alt,
            category: data.category,
            id_category: data.id_category,
          });
          setUserMessage("Modifications enregistrées");
          setIsModified(false);
        }
      } catch (error) {
        setUserMessage("Erreur réseau", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Traitement de la création
      if (isSubmitting) return; // Empêche une double création en cas de render
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "http://localhost:9000/back/v1/article/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              ...FormData, // Copie tous les champs de FormData
              id_user: userId(), // + identifiant de l'utilisateur connecté
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          setFormData({
            ...FormData,
            title: data.title,
            content: data.content,
            image: data.image,
            alt: data.alt,
            category: data.category,
          });
          setIsModified(false);
          setUserMessage("Création de l'article terminée");
          return;
        } else {
          setUserMessage("Erreur lors de la création de l'article");
        }
      } catch (error) {
        setUserMessage("Erreur réseau lors de la création de l'article");
      } finally {
        setIsSubmitting(false);
        setUserMessage("");
      }
    }
  };

  /* Annulation de la saisie */
  const onAnnul = () => {
    if (isSubmitting) {
      console.warn("Formulaire déjà en cours de sauvegarde !");
      return;
    }
    navigate("/articles");
  };

  const onVal = async () => {
    await CreateOrModif();

    if (isSubmitting) {
      console.warn("Formulaire déjà en cours de sauvegarde !");
      return;
    }

    setUserMessage("Modifications enregistrés");

    setTimeout(() => {
      if (article.id > 0) {
        navigate("/article/" + article.id);
      } else {
        navigate("/articles/");
      }
    }, 2000); // 2000 ms = 2 secondes
  };

  const onChangeTitle = (e) => {
    setFormData({
      ...FormData,
      title: e.target.value,
    });
    setIsModified(true);
  };

  const onChangeContent = (e) => {
    setFormData({
      ...FormData,
      content: e.target.value,
    });
    setIsModified(true);
  };

  const onChangeCategory = (e) => {
    const selectedCategory = Categories.find(
      (cat) => String(cat.id) === e.target.value
    );

    setFormData({
      ...FormData,
      category: selectedCategory ? selectedCategory.name : "",
      id_category: Number(e.target.value),
    });
    setIsModified(true);
  };

  const onChangeAlt = (e) => {
    setFormData({ ...FormData, alt: e.target.value });
    setIsModified(true);
  };

  const onChangeImage = (e) => {
    setFormData({ ...FormData, image: e.target.value });
    setIsModified(true);
  };

  const onMedia = () => {
    return !IsModified;
  };

  return (
    <div className="article-form">
      {IsLoadingCategories || IsLoadingArticle ? (
        <p className="loading-message">Chargement...</p>
      ) : (
        <>
          <section>
            <p className="form-message">{userMessage}</p>
            <div className="form-group">
              <label htmlFor="category">Choix de catégorie :</label>
              <select
                name="category"
                id="cat-select"
                value={FormData.id_category}
                onChange={onChangeCategory}
                className="form-select"
              >
                {Categories.map((cat) => (
                  <option key={String(cat.id)} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Titre de l'article :</label>
              <input
                type="text"
                name="title"
                id="title"
                value={FormData.title}
                minLength="5"
                maxLength="100"
                onChange={onChangeTitle}
                placeholder="Entrez votre titre"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Contenu de l'article :</label>
              <textarea
                className="form-textarea"
                name="content"
                id="content"
                value={FormData.content}
                rows="10"
                onChange={onChangeContent}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image de l'article :</label>
              <input
                id="article-image"
                name="image"
                value={FormData.image}
                minLength="1"
                maxLength="50"
                onChange={onChangeImage}
                placeholder="Nom de l'image principale (sans suffixe .webp)"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="alt">
                Description en cas d'absence d'image :
              </label>
              <input
                type="text"
                name="alt"
                id="alt"
                value={FormData.alt}
                minLength="5"
                maxLength="100"
                onChange={onChangeAlt}
                required
                className="form-input"
              />
            </div>
            {article.id > 0 && (
              <label htmlFor="viewmedia">
                <input
                  id="viewmedia"
                  name="viewmedia"
                  type="checkbox"
                  checked={ShowMedia}
                  onChange={() => setShowMedia((prev) => !prev)}
                />
                <span>Media</span>
              </label>
            )}
            {ShowMedia && (
              <ArticleMedia
                id_article={article.id}
                media_files={article.media_files}
                media_alts={article.media_alts}
              />
            )}
            {isAdmin() && (
              <div className="form-buttons">
                <Button
                  buttonLabel="Annuler"
                  variant="secondary"
                  onClick={onAnnul}
                />
                <Button
                  buttonLabel="Valider"
                  variant="primary"
                  onClick={onVal}
                />
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default ArticleForm;
