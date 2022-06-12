import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./muabaihat.module.css";

function MuaBaiHat() {
  const [list, setlist] = useState();
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/mua");
    setlist(res.data);
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={styles.table}>
        <div className={styles.tieuDe}>Danh sách mua bài hát</div>
        <div className={styles.tableContainer}>
          <div className={styles.cot}>
            <div className={styles.itemCot}>Khách hàng</div>
            <div className={styles.itemCot}>Bài hát</div>
            <div className={styles.itemCot}>Ngày</div>
            <div className={styles.itemCot}>Giá</div>
          </div>
          {list &&
            list.map((e) => (
              <div className={styles.hang}>
                <div className={styles.itemCot}>{e.maKH}</div>
                <div className={styles.itemCot}>{e.maBH}</div>
                <div className={styles.itemCot}>{e.ngay}</div>
                <div className={styles.itemCot}>{e.gia}</div>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
export default MuaBaiHat;
