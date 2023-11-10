import React from "react";
import {
  WalletOutlined,
  WifiOutlined,
  TabletOutlined,
  DesktopOutlined,
  FormatPainterOutlined,
  LoadingOutlined,
  ExperimentOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import styles from "./Detail.module.scss"

const Benefit = ({ data }) => {
  const { wifi, banLa, tivi, dieuHoa, mayGiat, bep, hoBoi, doXe } = data || {};
  return (
    <div className={styles.benefits}>
      <h2 className={styles.title}>
        Nơi này có những gì cho bạn
      </h2>
      <div className={styles['grid-container']}>
        {bep && (
          <div className={styles.grid__items}>
            <WalletOutlined />
            <div className={styles.item}>
              Bếp
            </div>
          </div>
        )}
        {wifi && (
          <div className={styles.grid__items}>
            <WifiOutlined />
            <div className={styles.item}>
              Wi-fi
            </div>
          </div>
        )}
        {banLa && (
          <div className={styles.grid__items}>
            <TabletOutlined />
            <div className={styles.item}>
              Bàn là
            </div>
          </div>
        )}
        {tivi && (
          <div className={styles.grid__items}>
            <DesktopOutlined />
            <div className={styles.item}>
              Ti vi
            </div>
          </div>
        )}
        {mayGiat && (
          <div className={styles.grid__items}>
            <ExperimentOutlined />
            <div className={styles.item}>
              Máy giặt
            </div>
          </div>
        )}
        {dieuHoa && (
          <div className={styles.grid__items}>
            <FormatPainterOutlined />
            <div className={styles.item}>
              Điều hòa
            </div>
          </div>
        )}
        {hoBoi && (
          <div className={styles.grid__items}>
            <AliwangwangOutlined />
            <div className={styles.item}>
              Hồ bơi
            </div>
          </div>
        )}
        {doXe && (
          <div className={styles.grid__items}>
            <LoadingOutlined />
            <div className={styles.item}>
              Đỗ xe
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Benefit);
