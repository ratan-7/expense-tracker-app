import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <Navbar />
        <Home />
      </div>
  },
  {
    path: "/dashboard",
    element:
      <div>
        <Navbar />
        <Dashboard />
      </div>
  },

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
