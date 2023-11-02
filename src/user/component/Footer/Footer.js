import React from 'react'
import "./style.scss"
import { faFacebook, faInstagram, faSquareFacebook, faSquareInstagram, faSquareTwitter, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <div className='footer'>
            <div className="grid grid-cols-3 py-12">
                <div className='space-y-2 flex flex-col'>
                    <h2 className='font-semibold'>Hỗ trợ</h2>
                    <a href='#'>Trung tâm trợ giúp</a>
                    <a href='#'>AirCover</a>
                    <a href='#'>Chống phân biệt đối xử</a>
                    <a href='#'>Hỗ trợ người khuyết tật</a>
                    <a href='#'>Các tùy chọn hủy</a>
                    <a href='#'>Báo cáo lo ngại của khu dân cư</a>
                </div>


                <div className='space-y-2 flex flex-col'>
                    <h2 className='font-semibold'>Đón tiếp khách</h2>
                    <a href="#">Cho thuê nhà trên Airbnb</a>
                    <a href="#">AirCover cho Chủ nhà</a>
                    <a href="#">Tài nguyên về đón tiếp khách</a>
                    <a href="#">Diễn đàn cộng đồng</a>
                    <a href="#">Đón tiếp khách có trách nhiệm</a>
                </div>

                <div className='space-y-2 flex flex-col'>
                    <h2 className='font-semibold'>Airbnb</h2>
                    <a href='#'>Trang tin tức</a>
                    <a href='#'>Tính năng mới</a>
                    <a href='#'>Cơ hội nghề nghiệp</a>
                    <a href='#'>Nhà đầu tư</a>
                    <a href='#'>Chỗ ở khẩn cấp Airbnb.org</a>
                </div>
            </div>
            <div className="flex items-center justify-between w-full py-6 border-t-[1px] border-gray-200 space-x-5">
                <div className='space-x-4'>
                    <span>© 2023 Airbnb, Inc.</span>
                    <a href="#">Quyền riêng tư</a>
                    <a href="#">Điều khoản</a>
                    <a href="#">Sơ đồ trang web</a>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='space-x-2 font-semibold'>
                        <FontAwesomeIcon icon={faGlobe} />
                        <a href="#">Tiếng Việt (VN)</a>
                    </div>
                    <div className='space-x-2 font-semibold'>
                        <span>$</span>
                        <a href="#">USD</a>
                    </div>
                    <div className='space-x-4'>
                        <FontAwesomeIcon icon={faSquareFacebook} size='lg' />
                        <FontAwesomeIcon icon={faSquareTwitter} size='lg' />
                        <FontAwesomeIcon icon={faSquareInstagram} size='lg' />
                    </div>

                </div>
            </div>
        </div>
    )
}
