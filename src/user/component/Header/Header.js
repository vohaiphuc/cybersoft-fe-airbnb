import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import "./style.scss";
import SearchBar from "./SearchBar/SearchBar";
import NormalSearchbar from "./SearchBar/NormalSearchbar";
import ExpandSearchbar from "./SearchBar/ExpandSearchbar";
import { useSelector } from "react-redux";

export default function Header({ searchBar }) {
  const [expandSearchBar, setExpandSearchBar] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  console.log(user);

  return (
    <div className="flex justify-between h-fit flex-wrap py-5 space-y-2">
      <div className="flex items-center justify-between w-full">
        <div className="logo">
          <Logo />
        </div>
        <div
          className="search-bar"
          onClick={() => {
            setExpandSearchBar(!expandSearchBar);
          }}
        >
          {searchBar && !expandSearchBar && <NormalSearchbar />}
          {searchBar && expandSearchBar && <ExpandSearchbar />}
        </div>
        <div className="nav flex items-center">
          <NavBar />
        </div>
      </div>
      {searchBar && expandSearchBar && (
        <div className="w-full max-w-5xl mx-auto bg-white">
          <SearchBar />
        </div>
      )}
    </div>
  );
}
