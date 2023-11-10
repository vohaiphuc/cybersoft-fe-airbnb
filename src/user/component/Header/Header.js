import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import "./style.scss"
import SearchBar from './SearchBar/SearchBar'
import NormalSearchbar from './SearchBar/NormalSearchbar'
import ExpandSearchbar from './SearchBar/ExpandSearchbar'
import useModalBg from '../Modal/useModalBg'
import { useRef } from 'react'
import useActiveInput from './SearchBar/SearchOption/useActiveInput'

export default function Header({ searchBar }) {
    const { isOpenModal, openModal, closeModal } = useModalBg()
    const expandSearchBar = isOpenModal

    const ref1 = useRef()
    const ref2 = useRef()
    const { setActiveIndex } = useActiveInput()

    const handleExpandSearchBar = () => {
        !expandSearchBar ? openModal() : closeModal()
    }

    const handleOnclick = (e) => {
        console.log(e.target);
        if (e.target == ref1.current || ref2.current.contains(e.target)) {
            setActiveIndex(null)
        }
    }

    return (
        <div className='flex justify-between h-fit flex-wrap py-5 space-y-2 ' ref={ref1} onClick={handleOnclick}>
            <div className="flex items-center justify-between w-full" ref={ref2}>
                <div className="logo w-1/3">
                    <Logo />
                </div>
                <div className="search-bar" onClick={handleExpandSearchBar}>
                    {searchBar && !expandSearchBar && <NormalSearchbar />}
                    {searchBar && expandSearchBar && <ExpandSearchbar />}
                </div>
                <div className="nav flex items-center justify-end w-1/3">
                    <NavBar />
                </div>
            </div>
            {searchBar && expandSearchBar &&
                <div className="w-full max-w-5xl mx-auto bg-white">
                    <SearchBar />
                </div>
            }
        </div>
    )
}
