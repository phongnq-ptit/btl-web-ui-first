import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import { User } from "./interface";
import AddBook from "./screens/AddBook";
import EditBook from "./screens/EditBook";
import ListBooks from "./screens/ListBooks";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ViewBook from "./screens/ViewBook";

const Page = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);

  return (
    <Routes>
      <Route path="/" element={<ListBooks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={user ? <AddBook /> : <NotFound />} />
      <Route path="/edit/:id" element={user ? <EditBook /> : <NotFound />} />
      <Route path="/view/:id" element={user ? <ViewBook /> : <NotFound />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Page;
