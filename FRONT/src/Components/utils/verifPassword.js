// Vérifie si un mot de passe est acceptable
export const verifPassword = (passwd) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(passwd);
};
