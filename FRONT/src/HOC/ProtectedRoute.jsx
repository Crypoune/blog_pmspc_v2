import { useEffect } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "/src/context/UserContext";

function ProtectedRoute({ element: Component }) {
  const { isLogged, currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!isLogged()) {
      navigate("/login");
    }
  }, [currentUser]);

  if (isLogged()) {
    return <Component {...params} />;
  }
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
