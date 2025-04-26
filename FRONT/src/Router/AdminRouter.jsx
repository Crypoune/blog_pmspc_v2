import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "/src/HOC/ProtectedRoute.jsx";

// Routes pour tous

import Header from "/src/Components/Partials/Header.jsx";
import Footer from "/src/Components/Partials/Footer.jsx";

import Home from "/src/Components/user/Home.jsx";

import Login from "/src/Components/auth/Login.jsx";

import ArticleList from "/src/Components/user/ArticleList.jsx";
import Article from "/src/Components/user/Article.jsx";
import CommentsList from "/src/Components/user/Partials/CommentsList.jsx";

import CategoryList from "/src/Components/user/CategoryList.jsx";

import About from "/src/Pages/About.jsx";
import Contact from "/src/Pages/Contact.jsx";
import LegalNotices from "/src/Pages/LegalNotices.jsx";
import TermsOfUse from "/src/Pages/TermsOfUse.jsx";
import PrivacyPolicy from "/src/Pages/PrivacyPolicy";
import CodeOfConduct from "/src/Pages/CodeOfConduct.jsx";

// également dispo pour l'admin, l'admin est une personne ! il a un profil :)
import UserProfile from "/src/Components/user/UserProfile";

// Routes pour administrateur
import Dashboard from "/src/Components/admin/Dashboard";
import UserList from "/src/Components/admin/user/UserList";
import ArticleForm from "/src/Components/admin/Article/ArticleForm.jsx";

function AdminRouter() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="articles/pattern" element={<ArticleList />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="article/:id" element={<Article />} />

        <Route
          path="dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />

        <Route path="user" element={<ProtectedRoute element={UserList} />} />

        <Route
          path="articleFormCreate/:0"
          element={<ProtectedRoute element={ArticleForm} />}
        />

        <Route
          path="articleForm/:id"
          element={<ProtectedRoute element={ArticleForm} />}
        />

        <Route path="login" element={<Login />} />

        <Route path="userprofile" element={<UserProfile />} />

        <Route path="comment/:id" element={<CommentsList />} />
        <Route path="category" element={<CategoryList />} />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="legal_notices" element={<LegalNotices />} />
        <Route path="privacy_policy" element={<PrivacyPolicy />} />
        <Route path="terms_of_use" element={<TermsOfUse />} />
        <Route path="code_of_conduct" element={<CodeOfConduct />} />

        <Route path="*" element={<h1>Page inexistante</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default AdminRouter;
