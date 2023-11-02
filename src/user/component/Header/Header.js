import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import NavBar from './NavBar'
import "./style.scss"

export default function Header({ searchBar }) {
    console.log("🚀 ~ file: Header.js:8 ~ Header ~ searchBar:", searchBar)
    return (
        <div className="flex items-center justify-between h-20">
            <div className="logo">
                <Logo />
            </div>
            <div className="search-bar">
                {searchBar && <SearchBar />}
            </div>
            <div className="nav flex items-center">
                <NavBar />
            </div>
        </div>
    )
}
