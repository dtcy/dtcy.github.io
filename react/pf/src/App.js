// src/App.js
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import RootLayout from './layout/RootLayout';
import ProjectLayout from './layout/ProjectLayout';

import P3 from './pages/projects/p3/P3';
import P2 from './pages/projects/p2/P2';
import P1 from './pages/projects/p1/P1';// Corrected import path
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout></RootLayout>}>
      <Route index element={<Home/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='projects' element={<ProjectLayout></ProjectLayout>}>
          <Route path='p1' element={<P1/>}></Route>{/* Corrected route path */}
          <Route path='p2' element={<P2/>}></Route>
          <Route path='p3' element={<P3/>}></Route>
      </Route> 
      <Route path='*' element={<NotFound/>}></Route>
   </Route>
  )
);


const App = () => {
  
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
};

export default App;
