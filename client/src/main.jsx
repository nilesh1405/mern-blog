import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";  
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from './Layout';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='about' element={<About />} />
      <Route path='home' element={<Home />} />
      <Route path='projects' element={<Projects />} />
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
