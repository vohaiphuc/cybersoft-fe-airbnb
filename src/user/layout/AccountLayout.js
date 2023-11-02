import React from 'react'
import Header from '../component/Header/Header'
import Footer from '../component/Footer/Footer'

export default function DefaultLayout({ children }) {
    return (
        <>
            <header className='px-20 border-b-[1px] border-gray-200'>
                <Header />
            </header>
            <div className="px-20">
                {children}
            </div>
            <footer className='px-20 bg-[#F7F7F7]'>
                <Footer />
            </footer>
        </>
    )
}
