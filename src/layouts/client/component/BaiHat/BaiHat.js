import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./BaiHat.module.css";
import { UserContext } from "../context/UserContext";

function BaiHat() {
  const { id } = useContext(UserContext);
  const [listdm, setlistdm] = useState();
  const [listcm, setlistcm] = useState();
  useEffect(async () => {
    const res = await axios.get(`http://localhost:2371/khachhang/baihat/${id}`);
    setlistdm(res.data.filter((i) => !i.DaMua));
    setlistcm(res.data.filter((i) => i.DaMua));
  });
  return (
    <div className={styles.BaiHat}>
      <div className={styles.baihat}>
        <div className={styles.baihat1}>DANH SÁCH BÀI HÁT CHƯA MUA</div>
        <div className={styles.listbaihat}>
          {listdm &&
            listdm.map((item) => (
              <div className={styles.itembaihat}>
                {/* eslint-disable global-require */}
                <img
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                  alt="hinh"
                  src={item.hinhAnh ? require(`../../../../assets/images/${item.hinhAnh}`) : ""} //  eslint-disable-line import/no-dynamic-require
                />
                <div className={styles.infoBaiHat}>
                  <p className={styles.tenBH}>{item.tenBH}</p>
                  <p className={styles.casiBH}>{item.maCS}</p>
                  <div className={styles.thongso}>
                    <p className={styles.so}>lượt view: {item.luotView}</p>
                    <p className={styles.so}>lượt mua: {item.luotMua}</p>
                    <p className={styles.so}>Giá: {item.gia}</p>
                  </div>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    onClick={async () => {
                      const res = await axios.post("http://localhost:2371/mua", {
                        maKH: id,
                        maBH: item.maBH,
                      });
                      console.log(res.data);
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
      <div className={styles.baihat}>
        <div className={styles.baihat1}>BÀI HÁT CỦA TÔI</div>
        <div className={styles.listbaihat}>
          {listcm &&
            listcm.map((item) => (
              <div className={styles.itembaihat}>
                {/* eslint-disable global-require */}
                <img
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                  }}
                  alt="hinh"
                  src={item.hinhAnh ? require(`../../../../assets/images/${item.hinhAnh}`) : ""} //  eslint-disable-line import/no-dynamic-require
                />
                <div className={styles.infoBaiHat}>
                  <p className={styles.tenBH}>{item.tenBH}</p>
                  <p className={styles.casiBH}>{item.maCS}</p>
                  <div className={styles.thongso}>
                    <p className={styles.so}>lượt view: {item.luotView}</p>
                    <p className={styles.so}>lượt mua: {item.luotMua}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default BaiHat;
