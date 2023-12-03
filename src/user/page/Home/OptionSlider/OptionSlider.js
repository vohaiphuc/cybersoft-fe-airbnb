import { faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { faChessBishop, faChessKing, faChessQueen, faCompass, faFloppyDisk, faHand, faHeart, faHospital, faHourglass, faIdBadge, faLemon, faMap, faMoon, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faChess, faChevronLeft, faChevronRight, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Carousel, Skeleton } from 'antd'
import React, { useRef, useState } from 'react'
import useDevice from '../../../hook/useDevice'
import { useSelector } from 'react-redux'
import { usePopup, POPUP_NAME } from '../../../component/Popup/hook/usePopup'

export default function OptionSlider() {
    const [itemActive, setItemActive] = useState(0);
    const [sliderArrow, setSliderArrow] = useState(0);
    const [modalId, setModalId] = useState(null);
    const refCarousel = useRef()
    const loading = useSelector(s => s.skeletonSlice.room)
    const popup = usePopup()

    const { isMobile, isTablet, isDesktop } = useDevice()
    let slidesToShow
    if (isMobile) {
        slidesToShow = 3
    } else if (isTablet) {
        slidesToShow = 5
    } else if (isDesktop) {
        slidesToShow = 12
    }

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

    const CustomSkeleton = ({ children }) => {
        return !loading ? (
            <div className='flex flex-col items-center space-y-1'>
                {children}
            </div>
        ) : (
            <div className='w-10 mx-auto flex flex-col items-center'>
                <div className='h-0 opacity-0'>
                    {children}
                </div>
                <Skeleton.Avatar active shape='circle' size={24} className='mb-1' />
                <Skeleton.Button active style={{ height: 20 }} />
            </div>
        )
    }

    return (
        <div className='space-x-2 md:space-x-5 slider-carousel flex items-center justify-between'>
            <div className='flex-auto w-4/5 relative'>
                <Carousel arrows={false} slidesToShow={slidesToShow} ref={refCarousel}>
                    {carouselItems.map((item, index) => {
                        const active = itemActive === index ? 'active' : ""
                        return <div key={index} className={`slider-item ${active}`}
                            onClick={() => { setItemActive(index) }}
                        >
                            <CustomSkeleton>
                                {item.icon}
                                <p className='truncate w-full text-center'>{item.label}</p>
                            </CustomSkeleton>
                        </div>
                    })}
                </Carousel>
                <div className="slider-arrow-container">
                    <div
                        className={`slider-arrow slider-arrow-prev ${sliderArrow === 0 ? 'hidden' : 'flex'}`}
                        onClick={handleSlidePrev}>
                        <FontAwesomeIcon icon={faChevronLeft} className='mx-auto ' />
                    </div>
                    <div
                        className={`slider-arrow slider-arrow-next ${sliderArrow === maxSlide ? 'hidden' : 'flex'}`}
                        onClick={handleSlideNext}>
                        <FontAwesomeIcon icon={faChevronRight} className='mx-auto ' />
                    </div>
                </div>
            </div>
            <div className='basis-[fit-content]'>
                <div className='flex items-center space-x-3 border-[1px] p-3 md:px-5 md:py-4 rounded-lg cursor-pointer'
                    onClick={() => popup.open(POPUP_NAME.ROOMFILTER)}>
                    <FontAwesomeIcon icon={faSliders} />
                    <span className='text-xs hidden md:block'>Bộ lọc</span>
                </div>
            </div>
        </div>
    )
}
