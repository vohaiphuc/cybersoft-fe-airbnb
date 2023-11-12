import React, { useEffect } from 'react'
import Header from '../component/Header/Header'
import Footer from '../component/Footer/Footer'

export default function DefaultLayout({ children }) {
    useEffect(() => {
        const height = 90
        const handleScroll = () => {
            if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
                console.log("show");
            } else {
                console.log("hide");
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, [])

    return (
        <>
            <header className='px-20 border-b-[1px] border-gray-200 fixed w-full bg-white z-20'>
                <Header searchBar />
            </header>
            <div className="px-20 pt-24">
                {children}
            </div>
            <footer className='px-20 bg-[#F7F7F7]'>
                <Footer />
            </footer>
        </>
    )
}
