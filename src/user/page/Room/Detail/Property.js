import React from "react";
import Booking from "./Booking";
import Image from "../Image";
import Benefit from "./Benefit";
import AccountInfo from "./AccountInfo";
import styles from "./Detail.module.scss";

const Property = ({ data }) => {
  const { phongNgu, phongTam } = data || {};

  return (
    <div className={styles.property}>
      <div className={styles.property__left}>
        <div className={styles.box}>
          <div>
            <h1 className={styles.title}>Toàn bộ căn hộ. Chủ nhà Vĩnh Thoại</h1>
            <span className={styles.info_property}>
              <span className=" mx-1">{phongNgu} phòng ngủ - </span>
              <span className=" mx-1">{phongTam} phòng tắm </span>
            </span>
          </div>
          <div className="w-12 h-12 relative force-image">
            <Image
              src="https://airbnb.cybersoft.edu.vn/public/temp/1663483666712_sapa.jpg"
              alt="Owner avatar"
              className={styles.img}
            />
          </div>
        </div>
        <AccountInfo />
        <Benefit data={data} />
      </div>
      <Booking data={data} />
    </div>
  );
};

export default React.memo(Property);
