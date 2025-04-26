import { useEffect, useState, useContext } from "react";
import { UserContext } from "/src/context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "/src/Components/Partials/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUser,
  faAddressBook,
  faList,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const navigate = useNavigate();
  const { userName, isAdmin } = useContext(UserContext);
  const [Stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const clickProfile = () => {
    navigate("/userprofile");
  };

  const clickUsers = () => {
    navigate("/user");
  };

  const clickArt = () => {
    navigate("/articles");
  };

  const clickCat = () => {
    navigate("/category");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          articlesRes,
          commentsRes,
          reactionsRes,
          categoriesRes,
          mediasRes,
          usersRes,
          sessionsRes,
        ] = await Promise.all([
          fetch("http://localhost:9000/back/v1/article/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:9000/back/v1/comment/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:9000/back/v1/reaction/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:9000/back/v1/category/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:9000/back/v1/media/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:9000/back/v1/user/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
          fetch("http://localhost:9000/back/v1/auth/stat", {
            method: "GET",
            credentials: "include",
          }).then((res) => res.json()),
        ]);

        setStats({
          articles: articlesRes[0]?.nbArticles || 0,
          comments: commentsRes[0]?.nbComments || 0,
          reactions: reactionsRes[0]?.nbReactions || 0,
          categories: categoriesRes[0]?.nbCategories || 0,
          medias: mediasRes[0]?.nbMedias || 0,
          users: usersRes[0]?.nbUsers || 0,
          sessions: sessionsRes[0]?.nbSessions || 0,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <p> Erreur : {error}</p>;
  }

  if (!Stats) {
    return <p>Chargement...</p>;
  }

  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faChartBar} />
          <h1>Dashboard</h1>
        </div>
        <section>
          <div className="dashboard-area">
            {isAdmin() && (
              <>
                <section>
                  <h3>Statistiques</h3>
                  <ul>
                    <li>Nombre d'articles : {Stats.articles}</li>
                    <li>Nombre de commentaires : {Stats.comments}</li>
                    <li>Nombre de reactions : {Stats.reactions}</li>
                    <li>Nombre de catégories : {Stats.categories}</li>
                    <li>Nombre de médias : {Stats.medias}</li>
                    <li>Nombre d'utilisateurs : {Stats.users}</li>
                    <li>Nombre de sessions : {Stats.sessions}</li>
                  </ul>
                </section>
                <section className="button-group">
                  <Button
                    buttonLabel="Mon profil"
                    ariaLabel="Mon profil"
                    icon={faUser}
                    variant="primary"
                    onClick={clickProfile}
                  />
                  <Button
                    buttonLabel="Utilisateurs"
                    ariaLabel="Utilisateurs"
                    icon={faAddressBook}
                    variant="primary"
                    onClick={clickUsers}
                  />
                  <Button
                    buttonLabel="Catégories"
                    ariaLabel="Catégories"
                    icon={faList}
                    variant="primary"
                    onClick={clickCat}
                  />
                  <Button
                    buttonLabel="Articles"
                    ariaLabel="Articles"
                    icon={faNewspaper}
                    variant="primary"
                    onClick={clickArt}
                  />
                </section>
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
