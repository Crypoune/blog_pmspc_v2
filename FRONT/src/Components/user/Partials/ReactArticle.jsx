import { useContext } from "react";
import { UserContext } from "/src/context/UserContext";
import Button from "/src/Components/Partials/Button";
import { faThumbsUp, faHeart } from "@fortawesome/free-solid-svg-icons";

function ReactArticle({ edit, nblike, nblove, actlike, actlove }) {
  const { isLogged } = useContext(UserContext);


  const ReActions = () => {
    if (edit && isLogged()) {
      return (
        <div className="react-article">
          <Button
            buttonLabel={nblike}
            ariaLabel="Signaler que j'aime l'article"
            icon={faThumbsUp}
            variant="secondary"
            onClick={actlike}
          />
          <Button
            buttonLabel={nblove}
            ariaLabel="Signaler que j'adore l'article"
            icon={faHeart}
            variant="secondary"
            onClick={actlove}
          />
        </div>
      );
    } else {
      return (
        <div className="react-article">
          <Button
            buttonLabel={nblike}
            ariaLabel="signaler que j'aime l'article"
            icon={faThumbsUp}
            variant="no-hover"
          />
          <Button
            buttonLabel={nblove}
            ariaLabel="Signaler que j'adore l'article"
            icon={faHeart}
            variant="no-hover"
          />
        </div>
      );
    }
  };

  return <ReActions />;
}

export default ReactArticle;
