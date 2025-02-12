import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import './index.css'
import  Home  from '../src/pages/Home.jsx';
import Register from '../src/pages/Register.jsx';
import LoginPage from './pages/Login.jsx';
import UserProfile from './pages/UserProfile.jsx'
import ProtectedRoute from './middleware/ProtectRoute.jsx';
import { AuthProvider } from './middleware/AuthContext.jsx';
import {Provider} from 'react-redux'
import { store } from './store/store.jsx';
import  LoginMiddleware  from './pages/LoginMiddleware.jsx';
import WhiteBoardsPage from './pages/WhiteBoardsPage.jsx';
import CreateNewBoard from './components/CreateNewBoard.jsx';




const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/protect" element={<LoginMiddleware />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/whiteboards" element={<WhiteBoardsPage />} />
      <Route path="/newBoard" element={<CreateNewBoard/>}/>
      <Route element={<ProtectedRoute />}>
      </Route>
      {/* <Route path="/user-profile" element={<UserProfile />} /> */}
    </Route>
  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <RouterProvider router={routes}/>
    </AuthProvider>
    </Provider>
  </StrictMode>
);
