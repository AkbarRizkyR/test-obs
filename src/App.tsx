import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/edit/:id" element={<UserEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
