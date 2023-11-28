import React, { useEffect } from 'react'
import Header from '../component/Header/Header'
import Footer from '../component/Footer/Footer'

export default function DefaultLayout({ children }) {
    return (
        <>
            <header className='px-3 lg:px-10 xl:px-20 border-b-[1px] border-gray-200 fixed w-full bg-white z-30'>
                <Header searchBar />
            </header>
            <div className="px-3 lg:px-10 xl:px-20 pt-24">
                {children}
            </div>
            <footer className='px-3 lg:px-10 xl:px-20 bg-[#F7F7F7]'>
                <Footer />
            </footer>
        </>
    )
}
