import React, { Fragment } from "react";
import {
  CrownOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styles from "./Detail.module.scss";

const AccountInfo = () => {
  return (
    <Fragment>
      <div className={styles.account}>
        <div className="flex items-start w-full">
          <CrownOutlined className="pt-1" />
          <div className="ml-4">
            <h3 className={styles.title_account}>TruongThanh là Chủ nhà siêu cấp</h3>
            <p className={styles.desc}>
              Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá
              cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời
              cho khách.
            </p>
          </div>
        </div>
        <div className="flex items-start mt-5">
          <EnvironmentOutlined className="pt-1" />
          <div className="ml-4">
            <h3 className={styles.title}>Địa điểm tuyệt vời</h3>
            <p className={styles.desc}>
              90% khách gần đây đã xếp hạng 5 sao cho vị trí này.
            </p>
          </div>
        </div>
        <div className="flex items-start mt-5">
          <CalendarOutlined className="pt-1" />
          <h3 className="ml-4 font-semibold text-gray-800  text-base sm:text-lg">
            Miễn phí hủy trong 48 giờ.
          </h3>
        </div>
      </div>
      <div className={styles.desc__item}>
        <h2>
          <img
            src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
            alt=""
            className="h-7 mb-4"
          />
        </h2>
        <p className={styles.desc__2}>
          Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy,
          thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như
          sự cố trong quá trình nhận phòng.
        </p>
      </div>
      <div className={styles.desc__item}>
        <p className={styles.desc__2}>
          Tận hưởng kỳ nghỉ dưỡng sức cảm xúc thư giãn trong một căn phòng ấm
          cúng, chào...
        </p>
      </div>
    </Fragment>
  );
};

export default React.memo(AccountInfo);
