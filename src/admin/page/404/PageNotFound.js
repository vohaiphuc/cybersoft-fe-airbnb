import { adminRoute } from "../../route/adminRoute"
import "./asset/style.scss"
import React from 'react'

export default function PageNotFound() {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Có vẻ như bạn đã đi lạc rồi
                                </h3>
                                <p>trang này không tồn tại!</p>
                                <a href={adminRoute.home.path} className="link_404 rounded">Về trang chủ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
