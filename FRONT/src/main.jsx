import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "/src/context/AuthContext";
import { UserProvider } from "/src/context/UserContext";

import App from "./App";
import "/src/assets/css/style.scss";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </AuthProvider>
);
