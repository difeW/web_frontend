import { Button, Modal, TextField } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./hangCSS.module.css";

function Hang() {
  const [list, setList] = useState();
  const [info, setInfo] = useState();
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/hang");
    setList(res.data);
  });
  const [infoThem, setInfoThem] = useState({});
  const [modal, setModal] = useState(false);
  const [chophep, setChoPhep] = useState(false);
  const [type, setType] = useState("");
  const handleClose = () => {
    setModal(false);
    setChoPhep(true);
  };
  const handleClickXem = async (id) => {
    const res = await axios.get(`http://localhost:2371/hang/${id}`);
    setInfo(res.data);
    console.log(res.data);
    setModal(true);
    setType("Xem");
  };
  const handleClickXoa = async (id) => {
    await axios.delete(`http://localhost:2371/hang/${id}`);
  };
  const handleClickThem = () => {
    setModal(true);
    setType("Them");
  };
  const handleThemHang = async () => {
    await axios.post(`http://localhost:2371/hang`, infoThem);
    setModal(false);
  };
  const handleChangThem = (e) => {
    setInfoThem({ ...infoThem, [e.target.name]: e.target.value });
    console.log(infoThem);
  };
  const handleChangInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleClickSua = async (id) => {
    if (chophep === true) setChoPhep(false);
    else {
      await axios.patch(`http://localhost:2371/hang/${id}`, info);
      setModal(false);
    }
  };
  const hamRong = () => {};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={styles.table}>
        <div className={styles.tieuDe}>
          Danh sách hạng
          <div
            tabIndex={0}
            role="button"
            onKeyDown={() => hamRong()}
            onClick={() => handleClickThem()}
            className={styles.Button}
          >
            Thêm hạng
          </div>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.cot}>
            <div className={styles.itemCot}>ID</div>
            <div className={styles.itemCot}>Tên hạng</div>
            <div className={styles.itemCot}>Hưởng thụ</div>
            <div className={styles.itemCot}>Giá mời Show</div>
            <div className={styles.itemCot}>Điều khiển</div>
          </div>
          {list &&
            list.map((item) => (
              <div className={styles.hang}>
                <div className={styles.itemCot}>{item.id}</div>
                <div className={styles.itemCot}>{item.tenHang}</div>
                <div className={styles.itemCot}>{item.chietKhau}</div>
                <div className={styles.itemCot}>{item.giaMoiShow} </div>
                <div className={styles.itemCot}>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => hamRong()}
                    onClick={() => handleClickXem(item.id)}
                    className={styles.dieukhienbtn}
                  >
                    Xem
                  </div>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => hamRong()}
                    onClick={() => handleClickXoa(item.id)}
                    className={styles.dieukhienbtn}
                  >
                    Xóa
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
              <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>THÔNG TIN HẠNG </p>
              <TextField
                value={info ? info.id : ""}
                disabled="true"
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="ID"
                label="ID"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled={chophep}
                value={info ? info.tenHang : ""}
                onChange={(e) => {
                  handleChangInfo(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="tenHang"
                label="Tên Hạng"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                disabled={chophep}
                onChange={(e) => {
                  handleChangInfo(e);
                }}
                value={info ? info.chietKhau : ""}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="chietKhau"
                label="Hưởng thụ"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                onChange={(e) => {
                  handleChangInfo(e);
                }}
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                value={info ? info.giaMoiShow : ""}
                name="giaMoiShow"
                label="Giá mời"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              {/* eslint-disable global-require */}
              {/* <img
            src={require("../../assets/images/bg-profile.jpeg")}
            alt="ko"
            width="100"
            height="100"
          /> */}
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
                    handleClickSua(info.id);
                  }}
                  variant="contained"
                  color="primary"
                >
                  <p style={{ color: "white" }}>Sửa</p>
                </Button>
              </div>
            </div>
          )}
          {Boolean(type === "Them") && (
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
              <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>THÊM HẠNG </p>
              <TextField
                value={infoThem.tenHang ? infoThem.tenHang : ""}
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="tenHang"
                label="Tên hạng"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                value={infoThem.chietKhau ? infoThem.chietKhau : ""}
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="chietKhau"
                label="Hưởng thụ"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                value={infoThem.giaMoiShow ? infoThem.giaMoiShow : ""}
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="giaMoiShow"
                label="Giá mời"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              {/* eslint-disable global-require */}
              {/* <img
            src={require("../../assets/images/bg-profile.jpeg")}
            alt="ko"
            width="100"
            height="100"
          /> */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-around ",
                }}
              >
                <Button
                  onClick={() => {
                    handleThemHang();
                  }}
                  variant="contained"
                  color="primary"
                >
                  <p style={{ color: "white" }}>Thêm</p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
}
export default Hang;
