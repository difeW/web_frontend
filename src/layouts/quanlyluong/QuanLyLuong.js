import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button, Modal } from "@mui/material";
import styles from "./quanlyluong.module.css";

function QuanLyLuong() {
  const [modal, setmodal] = useState(false);
  const [tb, settb] = useState(0);
  const [tong, settong] = useState(0);
  const [list, setlist] = useState();
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/luong");
    setlist(res.data);
    settb(
      res.data.reduce((sum, e) => {
        console.log(sum);
        console.log(e.luong);
        return sum + e.luong;
      }, 0) / res.data.length
    );
    settong(
      res.data.reduce((sum, e) => {
        console.log(sum);
        console.log(e.luong);
        return sum + e.luong;
      }, 0)
    );
  }, []);
  const exportPDF = () => {
    const input = document.getElementById("content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      /*    eslint new-cap: ["error", { "newIsCap": false }]    */
      const Pd = new jsPDF("p", "mm", "a4");
      Pd.addImage(imgData, "PNG", 1, 1);
      Pd.save("File.pdf");
    });
  };
  const outputPdf = () => {
    exportPDF();
  };
  const handleClose = () => {
    setmodal(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={styles.table1}>
        <div className={styles.tieuDe}>
          Danh sách Lương{" "}
          <Button
            onClick={() => {
              setmodal(true);
            }}
          >
            Click vào để xuất file
          </Button>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.cot}>
            <div className={styles.itemCot}>Ca sĩ</div>
            <div className={styles.itemCot}>Tháng</div>
            <div className={styles.itemCot}>Năm</div>
            <div className={styles.itemCot}>Tiền show</div>
            <div className={styles.itemCot}>Tiền bài hát</div>
            <div className={styles.itemCot}>Tổng lương</div>
          </div>
          {list &&
            list.map((e) => (
              <div className={styles.hang}>
                <div className={styles.itemCot}>{e.maCS}</div>
                <div className={styles.itemCot}>{e.thangGhiNhan + 1}</div>
                <div className={styles.itemCot}>{e.namGhiNhan}</div>
                <div className={styles.itemCot}>{e.tienShow}</div>
                <div className={styles.itemCot}>{e.tienBaiHat}</div>
                <div className={styles.itemCot}>{e.luong}</div>
              </div>
            ))}
        </div>
      </div>

      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          id="contained"
          style={{
            backgroundColor: "white",
            width: "42%",
            display: "flex",
            flexDirection: "column",
            height: "90%",
            overflowY: "scroll",
          }}
        >
          <div
            id="content"
            style={{
              width: "100%",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className={styles.thanh}> </div>
            <div className={styles.tt}>
              <div className={styles.logo}>BIGHIT</div>
              <div className={styles.sdt}>BIGHIT GROUP</div>
            </div>
            <h4>THỐNG KÊ TIỀN LƯƠNG</h4>
            <p style={{ fontSize: 12 }}>(Tiền lương của ca sĩ trong tháng 6 năm 2022)</p>
            <table className={styles.table}>
              <thead
                style={{
                  backgroundColor: "red",
                }}
              >
                <tr>
                  <th className={styles.th}>Ca sĩ</th>
                  <th className={styles.th}>Tiền bài hát</th>
                  <th className={styles.th}>Tiền show</th>
                  <th className={styles.th}>Thành Lương</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((e) => (
                    <tr className={styles.tr}>
                      <td className={styles.t}>{e.maCS}</td>
                      <td className={styles.t}>{e.tienBaiHat}</td>
                      <td className={styles.t}>{e.tienShow}</td>
                      <td className={styles.t}>{e.luong}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div
              style={{
                padding: 10,
                height: 300,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: 15,
                  color: "blue",
                }}
              >
                Lương trung bình: {tb}
              </p>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: 15,
                  color: "blue",
                }}
              >
                Tổng tiền phải trả: {tong}
              </p>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 40,
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  Nhân viên
                </div>
                <div>Nguyễn Đình Trải</div>
              </div>
            </div>

            <p className={styles.ngay}>13-06-2022</p>
            <div className={styles.thanh}> </div>
          </div>
          <Button
            onClick={() => {
              outputPdf();
            }}
          >
            Xuất
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
export default QuanLyLuong;
