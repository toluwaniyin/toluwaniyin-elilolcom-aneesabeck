import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import LoginPage from "./components/pages/Login";
import Friends from "./components/pages/GrowWithFriends";
import Header from "./components/modules/Header";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./components/pages/Dashboard";
import SingleTree from "./components/pages/SingleTree";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "302957686074-f03ek18k1rivju4hn5dkpd4nlap770ln.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/tree/:treeId" element ={<SingleTree />} />
      <Route path="/community" element={<Friends />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
