import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  buttonLabel = "",
  onClick,
  variant = "primary",
  icon = "",
  ariaLabel = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn--${variant}`}
      aria-label={ariaLabel || undefined}
      type="button"
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{buttonLabel}</span>
    </button>
  );
};

export default Button;
