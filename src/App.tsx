import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Page from "./Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { BookContextProvider } from "./context/BookContext";

function App() {
  return (
    <BookContextProvider>
      <BrowserRouter>
        <div id="App">
          <Header />
          <Page />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </BookContextProvider>
  );
}

export default App;
