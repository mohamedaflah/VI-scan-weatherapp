// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  // </React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster position="top-center"/>
        <App />
      </Provider>
    </BrowserRouter>
);
