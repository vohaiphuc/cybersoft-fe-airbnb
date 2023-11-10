import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import "./style.scss"
import SearchBar from './SearchBar/SearchBar'
import NormalSearchbar from './SearchBar/NormalSearchbar'
import ExpandSearchbar from './SearchBar/ExpandSearchbar'
import useModalBg from '../Modal/useModalBg'

export default function Header({ searchBar }) {
    const [expandSearchBar, setExpandSearchBar] = useState(false)
    const { openModal } = useModalBg()

    const handleExpandSearchBar = () => {
        !expandSearchBar && openModal()
        setExpandSearchBar(!expandSearchBar)
    }

    return (
        <div className='flex justify-between h-fit flex-wrap py-5 space-y-2'>
            <div className="flex items-center justify-between w-full">
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
