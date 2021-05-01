import ReactDOM from "react-dom";
import { CartProvider } from "./Context/CartProvider";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./Context/UserProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </AuthProvider>,
  rootElement
);
