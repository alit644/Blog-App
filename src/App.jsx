import "./App.css";

import { Route, Routes } from "react-router-dom";
import Root from "./layout/Root";
import Login from "./pages/auth/Login";
import MainLayout from "./layout/MainLayout";
import Signup from "./pages/auth/register";
import TostProvider from "./context/TostContext";
import RequireBack from "./pages/auth/RequireBack";
import Dashboard from "./components/Dashboard/Dashboard";
import Index from "./pages/Dashboaed";
import AddCategory from "./components/Dashboard/categories/AddCategory";
import RequireAuth from "./pages/Dashboaed/RequireAuth";
import Category from "./components/Dashboard/categories/Category";
import AddArticle from "./components/Dashboard/Articles/AddArticle";
import Blog from "./pages/Blog/Blog";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import Page404 from "./error/Page404";

function App() {
  return (
    <>
      <TostProvider>
        <Routes>
          {/* Home Route */}
          <Route element={<MainLayout />}>
            <Route index element={<Root />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-details/:id" element={<ArticleDetails />} />
            {/* Require Auth */}
            <Route element={<RequireBack />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
            </Route>
          </Route>
          {/* Dashboard Route */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Index />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="categories" element={<Category />} />
              <Route path="add-article" element={<AddArticle />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Page404 />} />
        </Routes>
      </TostProvider>
    </>
  );
}

export default App;
