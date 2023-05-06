import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Public from './components/Public'
import Login1 from './components/Login1'
import Login2 from './components/Login2'
import MultipleQuizz from './components/quizz/MultipleQuizz'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />} >
        {/* <Route index element={<Public />} />
        <Route path="login" element={<Layout />}>
          <Route path="style1" element={<Login1 />} />
          <Route path="style2" element={<Login2 />} />
        </Route> */}
        <Route index element={<MultipleQuizz />} />
      </Route>
    </Routes>
  )
}

export default App
