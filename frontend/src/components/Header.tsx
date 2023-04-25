import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="sticky top-0 z-10 bg-white border border-[#E2E8F0]">
            <section className="flex mx-auto max-w-screen-xl items-center justify-between p-3">
                <Link to="/">Home</Link>
            </section>
        </header>
    )
}

export default Header