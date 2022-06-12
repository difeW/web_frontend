import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./ChiTietCaSi.module.css";

function ChiTietCaSi() {
  const location = useLocation();
  const [info, setInfo] = useState();
  const [listbh, setlistBh] = useState();
  useEffect(async () => {
    const res = await axios.get(`http://localhost:2371/casi/${location.state.id}`);
    setInfo(res.data[0]);
    setlistBh(res.data[0].tenBh);
  }, []);

  return info ? (
    <div className={styles.ChiTietCaSi}>
      <div className={styles.TenCS}>{info && info.hoTen}</div>
      <div className={styles.img}>
        {/* eslint-disable global-require */}
        <img
          className={styles.img1}
          alt="hinh"
          src={info ? require(`../../../../assets/images/${info.hinhAnh}`) : ""} //  eslint-disable-line import/no-dynamic-require
        />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>THÔNG TIN CHI TIẾT</div>
        <div className={styles.label}>
          <div className={styles.title}>Ngày sinh:</div>
          <div className={styles.noidung}> {info && info.ngaySinh}</div>
        </div>
        <div className={styles.label}>
          <div className={styles.title}>Giới tính:</div>
          <div className={styles.noidung}> {info && info.gioiTinh}</div>
        </div>
        <div className={styles.label}>
          <div className={styles.title}>Hạng:</div>
          <div className={styles.noidung}> {info && info.maHang}</div>
        </div>
        <div className={styles.label}>
          <div className={styles.title}>Ngày gia nhập:</div>
          <div className={styles.noidung}> {info && info.ngayVao}</div>
        </div>
        <div className={styles.label1}>
          <div className={styles.title1}>Mô tả:</div>
          <div className={styles.noidung}> {info && info.moTa}</div>
        </div>
      </div>
      <div className={styles.baihat}>
        <div className={styles.baihat1}>DANH SÁCH BÀI HÁT</div>
        <div className={styles.listbaihat}>
          {listbh &&
            listbh.map((e) => (
              <div className={styles.itembaihat}>
                {/* eslint-disable global-require */}
                <img
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                  alt="hinh"
                  src={info ? require(`../../../../assets/images/${e.hinhAnh}`) : ""} //  eslint-disable-line import/no-dynamic-require
                />
                <div className={styles.infoBaiHat}>
                  <p className={styles.tenBH}>{e.tenBH}</p>
                  <p className={styles.casiBH}>{e.maCS}</p>
                  <div className={styles.thongso}>
                    <p className={styles.so}>lượt view: {e.luotView}</p>
                    <p className={styles.so}>lượt mua: {e.luotMua}</p>
                  </div>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    onClick={() => {
                      console.log(1);
                    }}
                    className={styles.Mua}
                  >
                    Mua
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div>No</div>
  );
}
export default ChiTietCaSi;
