import { faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { faChessBishop, faChessKing, faChessQueen, faCompass, faFloppyDisk, faHand, faHeart, faHospital, faHourglass, faIdBadge, faLemon, faMap, faMoon, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight, faChess, faChevronLeft, faChevronRight, faFilter, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Carousel } from 'antd'
import React, { useRef, useState } from 'react'
import FilterModal from './FilterModal'

export default function OptionSlider({ list, handleFilterRoom }) {
    const [itemActive, setItemActive] = useState(0);
    const [sliderArrow, setSliderArrow] = useState(0);
    const [modalId, setModalId] = useState(null);
    const refCarousel = useRef()
    const slidesToShow = 12
    const carouselItems = [
        {
            label: 'Thật ấn tượng',
            icon: <FontAwesomeIcon icon={faRedditAlien} />,
        },
        {
            label: 'Công viên quốc gia',
            icon: <FontAwesomeIcon icon={faHeart} />,
        },
        {
            label: 'Hồ bơi tuyệt vời',
            icon: <FontAwesomeIcon icon={faHand} />,
        },
        {
            label: 'Thật ấn tượng',
            icon: <FontAwesomeIcon icon={faMoon} />,
        },
        {
            label: 'Đảo',
            icon: <FontAwesomeIcon icon={faChessQueen} />,
        },
        {
            label: 'Bãi biển',
            icon: <FontAwesomeIcon icon={faLemon} />,
        },
        {
            label: 'Nhà nhỏ',
            icon: <FontAwesomeIcon icon={faCompass} />,
        },
        {
            label: 'Thiết kế',
            icon: <FontAwesomeIcon icon={faPaperPlane} />,
        },
        {
            label: 'Bắc cực',
            icon: <FontAwesomeIcon icon={faHospital} />,
        },
        {
            label: 'Cabin',
            icon: <FontAwesomeIcon icon={faIdBadge} />,
        },
        {
            label: 'Ven hồ',
            icon: <FontAwesomeIcon icon={faMap} />,
        },
        {
            label: 'Chơi golf',
            icon: <FontAwesomeIcon icon={faHourglass} />,
        },
        {
            label: 'Khung cảnh tuyệt vời',
            icon: <FontAwesomeIcon icon={faFloppyDisk} />,
        },
        {
            label: 'Hang động',
            icon: <FontAwesomeIcon icon={faChess} />,
        },
        {
            label: 'Lướt sóng',
            icon: <FontAwesomeIcon icon={faChessBishop} />,
        },
        {
            label: 'Nhà dưới lòng đất',
            icon: <FontAwesomeIcon icon={faChessKing} />,
        },
    ]
    const maxSlide = carouselItems.length - slidesToShow


    const handleSlidePrev = () => {
        if (sliderArrow > 0) {
            refCarousel.current.prev()
            setSliderArrow(sliderArrow - 1)
        }
    }

    const handleSlideNext = () => {
        if (sliderArrow < maxSlide) {
            refCarousel.current.next()
            setSliderArrow(sliderArrow + 1)
        }
    }

    const resetModal = () => {
        setModalId(Math.random())
        handleFilterRoom(list)
    }


    return (
        <div className='mt-5 space-x-5 slider-carousel flex items-center justify-between'>
            <div className='flex-auto w-4/5 relative'>
                <Carousel arrows={true} slidesToShow={slidesToShow} ref={refCarousel}>
                    {carouselItems.map((item, index) => {
                        const active = itemActive == index ? 'active' : ""
                        return <div key={index} className={`slider-item ${active}`}
                            onClick={() => { setItemActive(index) }}
                        >
                            {item.icon}
                            <p>{item.label}</p>
                        </div>
                    })}
                </Carousel>
                <div className="slider-arrow-container">
                    <div
                        className={`slider-arrow slider-arrow-prev ${sliderArrow == 0 ? 'hidden' : 'flex'}`}
                        onClick={handleSlidePrev}>
                        <FontAwesomeIcon icon={faChevronLeft} className='mx-auto ' />
                    </div>
                    <div
                        className={`slider-arrow slider-arrow-next ${sliderArrow == maxSlide ? 'hidden' : 'flex'}`}
                        onClick={handleSlideNext}>
                        <FontAwesomeIcon icon={faChevronRight} className='mx-auto ' />
                    </div>
                </div>
            </div>
            <div className='basis-[fit-content]'>
                <FilterModal list={list} handleFilterRoom={handleFilterRoom} key={modalId} resetModal={resetModal} />
            </div>
        </div>
    )
}
