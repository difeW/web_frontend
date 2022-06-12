import { Button, Modal, TextField } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./danhsachkhachhang.module.css";

function DanhSachKhachHang() {
  const [list, setLis] = useState();
  const [infoXem, setInfoXem] = useState();
  // const [infoThem, setInfoThem] = useState({});
  const [modal, setModal] = useState(false);
  const [chophep, setChoPhep] = useState(false);
  const [type, setType] = useState("");
  const handleClose = () => {
    setModal(false);
    setChoPhep(true);
  };
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/khachhang");
    setLis(res.data);
  }, []);
  const handleClickXem = async (id) => {
    const res = await axios.get(`http://localhost:2371/khachhang/${id}`);
    setInfoXem(res.data);
    setModal(true);
    setType("Xem");
  };
  const handleClickSua = async (id) => {
    if (chophep === true) setChoPhep(false);
    else {
      await axios.patch(`http://localhost:2371/khachhang/${id}`, infoXem);
      setModal(false);
    }
  };
  //   const handleClickXoa = (e) => {
  //     console.log(e);
  //   };
  //   const handleClickThem = () => {
  //     setModal(true);
  //     setType("Them");
  //   };
  const handleChangeXem = (e) => {
    setInfoXem({ ...infoXem, [e.target.name]: e.target.value });
  };
  const hamRong = () => {};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={styles.table}>
        <div className={styles.tieuDe}>
          Danh sách khách hàng
          <input className={styles.Button} variant="standard" placeholder="Tìm kiếm" />
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.cot}>
            <div className={styles.itemCot}>Tài khoản</div>
            <div className={styles.itemCot}>Họ tên</div>
            <div className={styles.itemCot}>Email</div>
            <div className={styles.itemCot}>Ngày sinh</div>
            <div className={styles.itemCot}>Doanh thu</div>
            <div className={styles.itemCot}>Điều khiển</div>
          </div>
          {list &&
            list.map((e) => (
              <div className={styles.hang}>
                <div className={styles.itemCot}>{e.taiKhoan}</div>
                <div className={styles.itemCot}>{e.hoTen}</div>
                <div className={styles.itemCot}>{e.email}</div>
                <div className={styles.itemCot}>{e.ngaySinh}</div>
                <div className={styles.itemCot}>{e.doanhThu}</div>
                <div className={styles.itemCot}>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => hamRong()}
                    onClick={() => handleClickXem(e.id)}
                    className={styles.dieukhienbtn}
                  >
                    Xem
                  </div>
                </div>
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
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Boolean(type === "Xem") && (
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>
                THÔNG TIN KHÁCH HÀNG
              </p>
              <TextField
                disabled="true"
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                value={infoXem ? infoXem.taiKhoan : ""}
                name="taiKhoan"
                label="Tài khoản"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                value={infoXem ? infoXem.hoTen : ""}
                name="hoTen"
                label="Họ tên"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                value={infoXem ? infoXem.email : ""}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                name="email"
                label="Email"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                value={infoXem ? infoXem.sdt : ""}
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                name="sdt"
                label="Số điện thoại"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                value={infoXem ? infoXem.diaChi : ""}
                name="diaChi"
                label="Địa chỉ"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled="true"
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                name="doanhThu"
                label="Doanh thu"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangeXem(e);
                }}
                value={infoXem ? infoXem.ngaySinh : ""}
                type="date"
                name="ngaySinh"
                label="Ngày sinh"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-around ",
                }}
              >
                {!chophep && (
                  <Button
                    onClick={() => {
                      setChoPhep(true);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    <p style={{ color: "white" }}>Hủy</p>
                  </Button>
                )}
                <Button
                  onClick={() => {
                    handleClickSua(infoXem.id);
                  }}
                  variant="contained"
                  color="primary"
                >
                  <p style={{ color: "white" }}>Sửa</p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
}
export default DanhSachKhachHang;
