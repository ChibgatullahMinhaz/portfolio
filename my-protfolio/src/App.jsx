
import { Outlet } from 'react-router'
import './App.css'
import { Footer } from './Components/Footer/Footer'
import { Navbar } from './Components/Navbar/Navbar'

function App() {

  return (
    <>
    <Navbar></Navbar>
      <h1>Vite + React</h1>

      <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App
