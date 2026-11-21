import { Route, Routes } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import WhatIsOrtholexoPage from "./pages/WhatIsOrtholexoPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/ti-einai-to-ortholexo" element={<WhatIsOrtholexoPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
