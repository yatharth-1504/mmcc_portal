import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";

const client = new ApolloClient({
  // uri: "http://localhost:8000/graphql",
  uri: "https://hostelaffairsiitm.com/api/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
