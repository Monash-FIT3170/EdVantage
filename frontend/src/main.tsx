import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import ErrorPage from "./error-page";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} errorElement={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
)
