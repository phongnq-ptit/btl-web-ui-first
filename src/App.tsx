import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Page from "./Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { BookContextProvider } from "./context/BookContext";
import { CartContextProvider } from "./context/CartContext";

function App() {
  return (
    <BookContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <div id="App">
            <Header />
            <Page />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </BookContextProvider>
  );
}

export default App;
