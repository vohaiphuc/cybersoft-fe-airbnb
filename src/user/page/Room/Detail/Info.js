import React, { Fragment } from "react";
import { StarFilled } from "@ant-design/icons";
import LazyImage from "../Image";
import styles from "./Detail.module.scss"

const Info = ({ data }) => {
  const { tenPhong, rating, khach, giuong, hinhAnh } = data || {};
  return (
    <Fragment>
      <div className={styles.info}>
        {tenPhong}
      </div>
      <div className={styles['info-detail']}>
        <StarFilled />
        <span>{rating || 2 + " sao"}</span>
        {khach && (
          <>
            <span>-</span> <span>{khach + " khách"}</span>
          </>
        )}
        {giuong && (
          <>
            <span>-</span> <span>{giuong + " giường"}</span>
          </>
        )}
      </div>

      <div className={styles.images}>
        <div className={styles.images__left}>
          <div className="w-full h-full p-1 force-image">
            <LazyImage
              alt={"gallery" + tenPhong}
              className={styles.img}
              src={hinhAnh}
            />
          </div>
        </div>
        <div className={styles.images__right}>
          <div className="w-full p-1 force-image">
            <LazyImage
              alt={"gallery" + tenPhong}
              className={styles.img}
              src={hinhAnh}
            />
          </div>
          {[0, 1].map((item) => {
            return (
              <div className="w-1/2 p-1 force-image" key={item}>
                <LazyImage
                  alt={"gallery" + tenPhong}
                  className={styles.img}
                  src={hinhAnh}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Info;
