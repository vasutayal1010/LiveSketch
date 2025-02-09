import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import  Home  from '../src/pages/Home.jsx';
import Register from '../src/pages/Register.jsx';
import LoginPage from './pages/Login.jsx';
import UserProfile from './pages/UserProfile.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
    </Route>
  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>
);
