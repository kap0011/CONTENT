import React from "react";
import { Routes, Route } from "react-router-dom";

import Feed from "./components/Feed";
import SearchTag from "./components/SearchTag";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/searchTag/:tag" element={<SearchTag />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
