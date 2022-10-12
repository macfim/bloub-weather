import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import UserLocationProvider from "./components/UserLocationProvider";
import { store } from "./store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserLocationProvider>
        <App />
      </UserLocationProvider>
    </Provider>
  </React.StrictMode>
);
