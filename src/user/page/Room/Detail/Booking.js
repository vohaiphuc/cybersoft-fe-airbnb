import { Button, Modal, notification } from "antd";
import { addDays, differenceInDays } from "date-fns";
import React, { useMemo, useState } from "react";
import "react-date-range/dist/styles.css";
import { StarFilled } from "@ant-design/icons";
import Calendar from "../Calendar";
import { formattedDate } from "../asset/utils";
import { roomServ } from "../../../api/api";
import styles from "./Detail.module.scss";

const Booking = ({ data }) => {
  const { giaTien, khach, id } = data || {};

  const [guest, setGuest] = useState(0);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  const totalDays = useMemo(
    () => differenceInDays(dates?.[0]?.endDate, dates?.[0]?.startDate),
    [dates?.[0]?.endDate, dates?.[0]?.startDate]
  );

  const totalPrice = useMemo(() => giaTien * totalDays, [giaTien, totalDays]);

  const handleCountGuest = (type) => {
    if (type === "plus") {
      if (guest < khach) {
        setGuest((prev) => prev + 1);
      }
      return;
    }
    if (guest > 0) {
      setGuest((prev) => prev - 1);
    }
  };

  const handleTogglePopup = () => {
    setToggleCalendar(!toggleCalendar);
  };

  //TODO: check user logged before execute handleBooking
  const userLogged = true;
  const userId = 4264;
  const handleBooking = async (e) => {
    e.preventDefault();
    if (userLogged && guest) {
      await roomServ
        .postBookingRoom({
          maPhong: id,
          ngayDen: dates?.[0]?.startDate,
          ngayDi: dates?.[0]?.endDate,
          soLuongKhach: guest,
          maNguoiDung: userId,
        })
        .then((res) => {
          if (res.status === 201) {
            notification.success({
              message: "Đặt phòng thành công",
            });
          }
        })
        .catch((error) => {
          notification.error({
            message: "Đặt phòng thất bại.",
          });
          throw error;
        });
    } else {
      //Handle push to login to booking room
    }
  };

  return (
    <div className={styles.booking}>
      <div className={styles.sticky_class}>
        <div className={styles.box}>
          <div className="relative w-full">
            <div className={styles.info_booking}>
              <div>
                <span>$ </span>
                <span className="text-xl font-semibold">{giaTien}</span>
                <span className="text-base"> / đêm</span>
              </div>
              <div>
                <span className="text-sm font-normal">
                  <StarFilled /> 5
                </span>
                {" - "}
                <span className={styles.rating}>98 đánh giá</span>
              </div>
            </div>
            <div className={styles.calendar}>
              <div onClick={handleTogglePopup} className={styles.calendar__box}>
                <div className={styles.date__left}>
                  <div className="text-xs uppercase font-semibold">
                    Nhận phòng
                  </div>
                  <div className="m-1">
                    {formattedDate(dates?.[0]?.startDate)}
                  </div>
                </div>
                <div className={styles.date__right}>
                  <div className="text-xs uppercase font-semibold">
                    Trả phòng
                  </div>
                  <div className="m-1">
                    {formattedDate(dates?.[0]?.endDate)}
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className={styles.guest}>Khách</div>
                <div className={styles.action}>
                  <Button
                    className={styles.button}
                    disabled={guest === 0}
                    onClick={() => handleCountGuest("minus")}
                  >
                    -
                  </Button>
                  <div>{guest || 0} khách</div>
                  <Button
                    disabled={guest >= khach}
                    onClick={() => handleCountGuest("plus")}
                    className={styles.button}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={styles.booking}
              disabled={!guest}
              onClick={handleBooking}
            >
              Đặt phòng
            </button>
            <div className="border-b">
              <div className={styles.price__item}>
                <div className={styles.price__item_detail}>
                  $ {giaTien} x {totalDays} đêm
                </div>
                <div>{totalPrice} $</div>
              </div>
              <div className={styles.price__item}>
                <div className={styles.price__item_detail}>Phí dịch vụ</div>
                <div>0 $</div>
              </div>
            </div>
            <div className={styles.total__price}>
              <div>Tổng trước thuế</div>
              <div>{totalPrice} $</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="!w-max"
        open={toggleCalendar}
        onCancel={handleTogglePopup}
        onOk={handleTogglePopup}
        okType="danger"
        centered
      >
        <Calendar dates={dates} setDates={setDates} />
      </Modal>
    </div>
  );
};

export default React.memo(Booking);
