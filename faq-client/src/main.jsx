import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Course from '../components/Course'
import CreateCourse from '../components/CreateCourse'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/:id',
        element: <Course />
    },
    {
        path: '/create',
        element: <CreateCourse />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
