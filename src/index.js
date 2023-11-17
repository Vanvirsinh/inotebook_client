import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Layout from './Layout';
import Home from "./components/Home/Home"
import About from './components/About/About';
import NoteState from './context/notes/NoteState';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NoteState>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </NoteState>
);
reportWebVitals();
