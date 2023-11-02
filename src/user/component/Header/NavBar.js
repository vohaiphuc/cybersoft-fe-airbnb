import { faBars, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from 'antd'
import React from 'react'

export default function NavBar() {
    return (
        <>
            <button className='py-1 px-3'>
                <a href="#" className='font-semibold'>Cho thuê chổ ở qua Airbnb</a>
            </button>
            <div className="mr-6 ml-3 cursor-pointer">
                <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="profile space-x-3 flex items-center cursor-pointer">
                <FontAwesomeIcon icon={faBars} />
                <Avatar src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" size={30} />
            </div>
        </>
    )
}
