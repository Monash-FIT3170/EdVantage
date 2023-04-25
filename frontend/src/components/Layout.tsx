import { Outlet } from 'react-router-dom'
import Header from './Header'
// import Footer from './Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <main className="flex grow mx-auto max-w-screen-xl w-full">
                <Outlet/>
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default Layout