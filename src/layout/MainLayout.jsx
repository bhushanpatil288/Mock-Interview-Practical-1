import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">  
        <header>
            <Navbar />
        </header>
        <main className="flex-grow">
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default MainLayout