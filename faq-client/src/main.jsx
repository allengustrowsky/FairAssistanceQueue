import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Course from '../components/Course'
import CreateCourse from '../components/CreateCourse'
import NewCourse from '../components/NewCourse'
import './index.css'
import  { createTheme, ThemeProvider } from '@mui/material/styles'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/index/:id',
        element: <Course />
    },
    {
        path: '/create',
        element: <CreateCourse />
    },
    {
        path: '/view/:id',
        element: <NewCourse />
    }
])

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'Avenir',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
