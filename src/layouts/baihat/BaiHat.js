import { Button, Modal, TextField, Autocomplete } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BaiHat.module.css";

function BaiHat() {
  const [infoThem, setInfoThem] = useState({ luotView: 0, luotMua: 0 });
  const [options, setOption] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/casi");
    console.log(res.data);
    setOption(res.data.map((i) => i.hoTen));
    setValues(
      res.data.map((i) => ({
        hoTen: i.hoTen,
        maCS: i.id,
      }))
    );
  }, []);
  const [modal, setModal] = useState(false);
  const [chophep, setChoPhep] = useState(false);
  const [type, setType] = useState("");
  const [list, setList] = useState();
  const [infoXem, setInfoXem] = useState();
  const handleClickSua = async () => {
    if (chophep === true) setChoPhep(false);
    else {
      await axios.patch(`http://localhost:2371/baihat/${infoXem.maBH}`, infoXem);
      setModal(false);
    }
  };
  const handleClose = () => {
    setModal(false);
    setChoPhep(true);
  };
  const handleClickXem = async (id) => {
    const res = await axios.get(`http://localhost:2371/baihat/${id}`);
    setInfoXem(res.data);
    setModal(true);
    setType("Xem");
  };
  const handleClickXoa = async (id) => {
    console.log(1);
    await axios.delete(`http://localhost:2371/baihat/${id}`);
  };
  const handleClickThem = () => {
    setModal(true);
    setType("Them");
  };
  const handleThemBaiHat = async () => {
    console.log(infoThem);
    const res = await axios.post("http://localhost:2371/baihat", infoThem);
    console.log(res.data);
    setModal(false);
    setInfoThem({});
  };
  const handleChangThem = (e) => {
    if (e.target.name === "hinhAnh") {
      let fileImage = e.target.value;
      fileImage = fileImage.slice(12);
      setInfoThem({ ...infoThem, hinhAnh: fileImage });
    } else if (e.target.name === "mp4") {
      let fileImage = e.target.value;
      fileImage = fileImage.slice(12);
      setInfoThem({ ...infoThem, mp4: fileImage });
    } else setInfoThem({ ...infoThem, [e.target.name]: e.target.value });
    console.log(infoThem);
  };
  const handleChangThemCombox = (value) => {
    const re = values.filter((e) => e.hoTen === value);
    console.log(values);
    setInfoThem({ ...infoThem, maCS: re[0].maCS });
  };
  const handleChangSua = (e) => {
    if (e.target.name === "hinhAnh") {
      let fileImage = e.target.value;
      fileImage = fileImage.slice(12);
      setInfoXem({ ...infoXem, hinhAnh: fileImage });
    } else setInfoXem({ ...infoXem, [e.target.name]: e.target.value });
    console.log(infoXem);
  };
  const hamRong = () => {};
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/baihat");
    setList(res.data);
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={styles.table}>
        <div className={styles.tieuDe}>
          Danh sách bài hát
          <div
            tabIndex={0}
            role="button"
            onKeyDown={() => hamRong()}
            onClick={() => handleClickThem()}
            className={styles.Button}
          >
            Thêm bài hát
          </div>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.cot}>
            <div className={styles.itemCot}>Tên bài hát</div>
            <div className={styles.itemCot}>Ca Sĩ</div>
            <div className={styles.itemCot}>Ngày phát hành</div>
            <div className={styles.itemCot}>Lượt View</div>
            <div className={styles.itemCot}>Lượt Mua</div>
            <div className={styles.itemCot}>Giá</div>
            <div className={styles.itemCot}>Điều Khiển</div>
          </div>
          {list &&
            list.map((item) => (
              <div className={styles.hang}>
                <div className={styles.itemCot}>{item.tenBH}</div>
                <div className={styles.itemCot}>{item.maCS}</div>
                <div className={styles.itemCot}>{item.ngayPhatHanh}</div>
                <div className={styles.itemCot}>{item.luotView}</div>
                <div className={styles.itemCot}>{item.luotMua}</div>
                <div className={styles.itemCot}>{item.gia}</div>
                <div className={styles.itemCot}>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => hamRong()}
                    onClick={() => handleClickXem(item.maBH)}
                    className={styles.dieukhienbtn}
                  >
                    Xem
                  </div>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => hamRong()}
                    onClick={() => handleClickXoa(item.maBH)}
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
              <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>
                THÔNG TIN BÀI HÁT{" "}
              </p>
              <TextField
                disabled={chophep}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onChange={(e) => {
                  handleChangSua(e);
                }}
                value={infoXem.tenBH}
                name="tenBH"
                label="Tên bài hát"
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
                  handleChangSua(e);
                }}
                value={infoXem.maCS}
                name="maCS"
                label="Ca Sĩ"
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
                  handleChangSua(e);
                }}
                value={infoXem.ngayPhatHanh}
                type="date"
                name="ngayPhatHanh"
                label="Ngày phát hành"
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
                  handleChangSua(e);
                }}
                type="file"
                name="hinhAnh"
                label="Hình ảnh"
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
                  handleChangSua(e);
                }}
                value={infoXem.mp4}
                name="mp4"
                label="Mp4"
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
                  handleChangSua(e);
                }}
                type="number"
                value={infoXem.gia}
                name="gia"
                label="Giá"
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
                  handleChangSua(e);
                }}
                value={infoXem.luotView}
                name="luotView"
                label="Lượt Xem"
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
                  handleChangSua(e);
                }}
                value={infoXem.luotMua}
                name="luotMua"
                label="Lượt Mua"
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
                    handleClickSua();
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
              <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>
                THÔNG TIN BÀI HÁT{" "}
              </p>
              <TextField
                value={infoThem.tenBH ? infoThem.tenBH : ""}
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                name="tenBH"
                label="Tên bài hát    "
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />

              <Autocomplete
                name="maCS"
                onChange={(e, value) => {
                  handleChangThemCombox(value);
                }}
                options={options}
                style={{ width: "90%", marginBottom: 10 }}
                renderInput={(params) => (
                  <TextField
                    name="maCS"
                    {...params}
                    label="Ca sĩ"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                )}
              />
              <TextField
                value={infoThem.ngayPhatHanh ? infoThem.ngayPhatHanh : "2022-07-07"}
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                type="date"
                name="ngayPhatHanh"
                label="Ngày phát hành"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                type="file"
                name="hinhAnh"
                label="Hình ảnh"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                type="file"
                name="mp4"
                label="Mp4"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
              />
              <TextField
                onChange={(e) => {
                  handleChangThem(e);
                }}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                type="number"
                name="gia"
                label="Giá"
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
                    handleThemBaiHat();
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
export default BaiHat;
