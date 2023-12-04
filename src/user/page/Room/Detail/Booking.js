import "react-date-range/dist/styles.css";
import { Button, Modal, notification } from "antd";
import { addDays, differenceInDays } from "date-fns";
import React, { useMemo, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import Calendar from "../Calendar";
import { formattedDate } from "../asset/utils";
import { roomServ } from "../../../api/api";
import styles from "./Detail.module.scss";
import { useSelector } from "react-redux";
import { POPUP_NAME, usePopup } from "../../../component/Popup/hook/usePopup";
import dayjs from 'dayjs'

const Booking = ({ data }) => {
  const { giaTien, khach, id } = data || {};
  const { user } = useSelector((state) => state.userSlice?.user) || {};
  const popup = usePopup()

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
    [dates]
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

  const handleBooking = async (e) => {
    e.preventDefault();
    if (user?.id && guest) {
      try {
        const res = await roomServ.postBookingRoom({
          maPhong: id,
          ngayDen: dayjs(dates?.[0]?.startDate).add(7, 'hours').format(),
          ngayDi: dayjs(dates?.[0]?.endDate).add(7, 'hours').format(),
          soLuongKhach: guest,
          maNguoiDung: user?.id,
        });
        if (res.status === 201) {
          notification.success({
            message: "Đặt phòng thành công",
          });
          setGuest(0);
        }
      } catch (error) {
        notification.error({
          message: "Đặt phòng thất bại.",
        });
        throw error;
      }
    } else {
      popup.open(POPUP_NAME.LOGIN)
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
