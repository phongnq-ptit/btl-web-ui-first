import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import { User } from "./interface";
import Register from "./screens/common/Register";
import ViewBook from "./screens/admin/ViewBook";
import ListBooks from "./screens/admin/ListBooks";
import AddBook from "./screens/admin/AddBook";
import EditBook from "./screens/admin/EditBook";
import Login from "./screens/common/Login";

const Page = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN SCREEN */}
      <Route path="/admin" element={<ListBooks />} />
      <Route path="/admin/add" element={<AddBook />} />
      <Route path="/admin/edit/:id" element={<EditBook />} />
      <Route path="/admin/view/:id" element={<ViewBook />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Page;
