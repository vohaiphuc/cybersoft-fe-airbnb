import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import NavBar from './NavBar'

export default function Header() {
    return (
        <div className="flex justify-between">
            <div className="logo">
                <Logo />
            </div>
            <div className="search-bar">
                <SearchBar />
            </div>
            <div className="nav">
                <NavBar />
            </div>
        </div>
    )
}
