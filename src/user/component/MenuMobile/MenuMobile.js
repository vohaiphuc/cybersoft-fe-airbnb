import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowWidth } from '@react-hook/window-size'
import React, { useEffect, useState } from 'react'
import { userRoute } from '../../route/userRoute'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./style.scss"
import { POPUP_NAME, usePopup } from '../Popup/hook/usePopup'

export default function MenuMobile() {
    const windowWidth = useWindowWidth()
    const isMobile = windowWidth < 1000
    const [show, setShow] = useState(isMobile);
    const navigate = useNavigate()
    const popup = usePopup()
    const { user } = useSelector(s => s.userSlice)
    const urlPath = useLocation().pathname

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop) {
                // Scrolling down
                setShow(false)
            } else {
                // Scrolling up
                setShow(true)
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
        }
        if (isMobile) {
            document.addEventListener("scroll", handleScroll)
        }
        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [isMobile])

    const buttonList = [
        {
            icon: faHome,
            title: "Trang chủ",
            active: (urlPath == userRoute.home.path) ? "active" : "",
            onClick: () => { navigate(userRoute.home.path) },
        },
        {
            icon: faSearch,
            title: "Khám phá",
            active: (urlPath != userRoute.home.path && urlPath != userRoute.account.path) ? "active" : "",
            onClick: () => { navigate(userRoute.home.path) },
        },
        {
            icon: faUser,
            title: user ? "Tài khoản" : "Đăng nhập",
            active: (urlPath == userRoute.account.path) ? "active" : "",
            onClick: () => {
                user
                    ? navigate(userRoute.account.path)
                    : popup.open(POPUP_NAME.LOGIN)
            },
        },
    ]

    return isMobile && (
        <div className={`menu-mobile w-full fixed transition-all ${show ? 'bottom-0' : '-bottom-20'} left-0 bg-white flex items-center justify-center space-x-5 shadow-2xl z-50 border-t-[1px] py-3`}>
            {buttonList.map((item, index) => (
                <div className={`flex flex-col items-center ${item.active}`} key={index} onClick={item.onClick}>
                    <FontAwesomeIcon icon={item.icon} size='xl' />
                    <span className='text-xs'>{item.title}</span>
                </div>
            ))}
        </div>
    )
}