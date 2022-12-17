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
import Home from "./screens/client/Home";

const Page = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CLIENT SCREEN */}
      <Route path="/" element={<Home />} />

      {/* ADMIN SCREEN */}
      <Route
        path="/admin"
        element={!user || user.role !== "ADMIN" ? <Login /> : <ListBooks />}
      />
      <Route
        path="/admin/add"
        element={!user || user.role !== "ADMIN" ? <Login /> : <AddBook />}
      />
      <Route
        path="/admin/edit/:id"
        element={!user || user.role !== "ADMIN" ? <Login /> : <EditBook />}
      />
      <Route
        path="/admin/view/:id"
        element={!user || user.role !== "ADMIN" ? <Login /> : <ViewBook />}
      />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Page;
