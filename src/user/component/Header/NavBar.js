import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function NavBar() {
    return (
        <>
            <button>Cho thuê chổ ở qua Airbnb</button>
            <FontAwesomeIcon icon={faGlobe} />
        </>
    )
}
