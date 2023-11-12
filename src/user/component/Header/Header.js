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
  const { isOpenModal } = useModalBg()
  const expandSearchBar = isOpenModal

  const ref1 = useRef()
  const ref2 = useRef()
  const { setActiveIndex } = useActiveInput()

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target == ref1.current || ref2.current.contains(e.target)) {
        setActiveIndex(null)
      }
    }
    if (expandSearchBar) {
      document.addEventListener("click", handleClick)
    }
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [expandSearchBar])

  const height = searchBar && expandSearchBar ? 16 : 0

  return (
    <div className='flex justify-between h-fit flex-wrap py-5 space-y-2 ' ref={ref1} >
      <div className="flex items-center justify-between w-full" ref={ref2}>
        <div className="logo w-1/3">
          <Logo />
        </div>
        <div className="search-bar" >
          {searchBar && !expandSearchBar && <NormalSearchbar />}
          {searchBar && expandSearchBar && <ExpandSearchbar />}
        </div>
        <div className="nav flex items-center justify-end w-1/3">
          <NavBar />
        </div>
      </div>
      <div className={`w-full max-w-5xl mx-auto bg-white transition-all h-${height}`}>
        <SearchBar />
      </div>
    </div>
  )
}
