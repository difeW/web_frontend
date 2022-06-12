import { Button, Modal, TextField } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./quanlyshowdien.module.css";

function QuanLyShowDien() {
  //   const [infoThem, setInfoThem] = useState({});
  const [list, setlist] = useState();
  const [modal, setModal] = useState(false);
  const [chophep, setChoPhep] = useState(false);
  const [infoXem, setInfoThem] = useState();
  const [type, setType] = useState("");
  const [listcasi, setlistcasi] = useState([]);

  const handleClose = () => {
    setModal(false);
    setChoPhep(true);
  };
  const handleClickXem = async (id) => {
    const res = await axios.get(`http://localhost:2371/showdien/${id}`);
    const res1 = await axios.get(`http://localhost:2371/casishow/casi/${id}`);
    setInfoThem(res.data);
    setlistcasi(res1.data);
    setModal(true);
    setType("Xem");
  };
  const onChangeText = (e) => {
    setInfoThem({ ...infoXem, [e.target.name]: e.target.value });
  };
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/showdien");
    setlist(res.data);
  });
  //   const handleThemHang = () => {
  //     console.log(infoThem);
  //   };
  //   const handleChangThem = (e) => {
  //     setInfoThem({ ...infoThem, [e.target.name]: e.target.value });
  //   };
  const hamRong = () => {};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={styles.table}>
        <div className={styles.tieuDe}>Danh sách show diễn</div>
        <div className={styles.tableContainer}>
          <div className={styles.cot}>
            <div className={styles.itemCot}>Tên Show</div>
            <div className={styles.itemCot}>Khách hàng</div>
            <div className={styles.itemCot}>Ngày bắt đầu</div>
            <div className={styles.itemCot}>Địa điểm</div>
            <div className={styles.itemCot}>tình trạng</div>
            <div className={styles.itemCot}>Điều khiển</div>
          </div>
          {list &&
            list.map((e) => (
              <div className={styles.hang}>
                <div className={styles.itemCot}>{e.tenShow}</div>
                <div className={styles.itemCot}>{e.maKH}</div>
                <div className={styles.itemCot}>{e.ngayBatDau}</div>
                <div className={styles.itemCot}>{e.diaDiem}</div>
                <div className={styles.itemCot}>{e.tinhTrang}</div>
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
            width: "70%",
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
              <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>THÔNG TIN SHOW</p>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    disabled={chophep}
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.tenShow}
                    name="tenShow"
                    label="Tên show"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled={chophep}
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.ngayBatDau}
                    type="date"
                    name="ngayBatDau"
                    label="Ngày Bắt Đầu"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled={chophep}
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.diaDiem}
                    name="diaDiem"
                    label="Địa Điểm"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled={chophep}
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.ghiChu}
                    name="ghiChu"
                    label="Ghi chú"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled={chophep}
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.ngayKetThuc}
                    type="date"
                    name="ngayKetThuc"
                    label="Ngày kết thúc"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled="true"
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.tinhTrang}
                    name="tinhTrang"
                    label="Tình Trạng"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled="true"
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.chiPhi}
                    name="chiPhi"
                    label="Chi Phí"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    disabled="true"
                    style={{
                      width: "90%",
                      marginBottom: 10,
                    }}
                    value={infoXem.ngayDatShow}
                    name="ngayDatShow"
                    label="Ngày Đặt Show"
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
                      width: "60%",
                      display: "flex",
                      justifyContent: "space-around ",
                    }}
                  >
                    {Boolean(infoXem.tinhTrang === "chưa xác nhận") && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          onClick={async () => {
                            await axios.patch(
                              `http://localhost:2371/showdien/accept/${infoXem.id}`
                            );
                            setModal(false);
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          <p style={{ color: "white" }}>Xác nhận</p>
                        </Button>
                        <div style={{ width: 10 }}> </div>
                        <Button
                          onClick={async () => {
                            await axios.patch(
                              `http://localhost:2371/showdien/cancel/${infoXem.id}`
                            );
                            setModal(false);
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          <p style={{ color: "white" }}>Hủy Show</p>
                        </Button>
                      </div>
                    )}
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
                    {Boolean(infoXem.tinhTrang === "chưa xác nhận") && (
                      <Button
                        onClick={async () => {
                          if (chophep === true) setChoPhep(false);
                          else {
                            console.log(infoXem);
                            await axios.patch(
                              `http://localhost:2371/showdien/${infoXem.id}`,
                              infoXem
                            );
                            setModal(false);
                          }
                        }}
                        variant="contained"
                        color="primary"
                      >
                        <p style={{ color: "white" }}>Sửa</p>
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    Ca sĩ trong show
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: 5,
                        width: 200,
                        color: "#bbb",
                        fontWeight: "700",
                        fontSize: 14,
                      }}
                    >
                      Tên ca sĩ
                    </div>
                    <div
                      style={{
                        color: "#bbb",
                        fontWeight: "700",
                        fontSize: 14,
                      }}
                    >
                      Giá
                    </div>
                  </div>
                  {listcasi &&
                    listcasi.map((item) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            marginBottom: 5,
                            width: 200,
                            color: "#777",
                            fontWeight: "700",
                            fontSize: 14,
                          }}
                        >
                          {item.hoTen}
                        </div>
                        <div
                          style={{
                            color: "#777",
                            fontWeight: "700",
                            fontSize: 14,
                          }}
                        >
                          {item.giaMoiShow}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
}
export default QuanLyShowDien;
