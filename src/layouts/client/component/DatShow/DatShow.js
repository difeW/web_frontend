import { Button, Checkbox, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import styles from "./DatShow.module.css";

function DatShow() {
  const { id } = useContext(UserContext);
  console.log(id);
  const [mess, setmess] = useState("");
  const [listcasiThem, setListcasiThem] = useState([]);
  const [listcs, setlistcs] = useState([]);
  const [chiPhi, setChiPhi] = useState(0);
  const [infoThem, setInfoThem] = useState({
    maKH: id,
  });
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/casi");
    setlistcs(res.data);
  });
  const onChangeText = (e) => {
    setInfoThem({ ...infoThem, [e.target.name]: e.target.value });
  };
  const onChangeCheckbox = (e) => {
    let check = -1;
    for (let i = 0; i < listcasiThem.length; ) {
      if (listcasiThem[i] === e.target.value) {
        check = i;
        break;
      }
      i += 1;
    }
    if (check !== -1) {
      for (let i = 0; i < listcs.length; ) {
        if (listcs[i].id === e.target.value) {
          setChiPhi(chiPhi - listcs[i].giaMoiShow);
          break;
        }
        i += 1;
      }
      const newlist1 = listcasiThem.slice();
      newlist1.splice(check, 1);
      setListcasiThem([...newlist1]);
      console.log("Xoa");
    } else {
      for (let i = 0; i < listcs.length; ) {
        if (listcs[i].id === e.target.value) {
          console.log(listcs[i].giaMoiShow);
          setChiPhi(chiPhi + listcs[i].giaMoiShow);
          console.log(chiPhi);
          break;
        }

        i += 1;
      }
      const newlist = listcasiThem.slice();
      setListcasiThem([...newlist, e.target.value]);
      console.log("Them");
    }
  };
  return (
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
      <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>THÔNG TIN ĐẶT SHOW</p>
      <TextField
        style={{
          width: "90%",
          marginBottom: 10,
        }}
        onChange={(e) => {
          onChangeText(e);
        }}
        name="tenShow"
        label="Tên show"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />

      <TextField
        style={{
          width: "90%",
          marginBottom: 10,
        }}
        name="diaDiem"
        label="Địa Điểm"
        onChange={(e) => {
          onChangeText(e);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <TextField
        style={{
          width: "90%",
          marginBottom: 10,
        }}
        name="ghiChu"
        onChange={(e) => {
          onChangeText(e);
        }}
        label="Ghi chú"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <TextField
        style={{
          width: "90%",
          marginBottom: 10,
        }}
        onChange={(e) => {
          onChangeText(e);
        }}
        type="date"
        name="ngayBatDau"
        label="Ngày Bắt Đầu"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <TextField
        style={{
          width: "90%",
          marginBottom: 10,
        }}
        type="date"
        onChange={(e) => {
          onChangeText(e);
        }}
        name="ngayKetThuc"
        label="Ngày kết thúc"
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <div className={styles.chon}>
        <p className={styles.ti}>Chọn Ca Sĩ</p>
        {listcs &&
          listcs.map((item) => (
            <div className={styles.label}>
              <Checkbox
                label="Khum"
                value={item.id}
                onChange={(e) => {
                  onChangeCheckbox(e);
                }}
              />
              <p className={styles.ti}>{item.hoTen}</p>
            </div>
          ))}
      </div>
      <p
        style={{
          color: "green",
        }}
      >
        {mess}
      </p>
      <Button
        onClick={async () => {
          console.log({ ...infoThem, chiPhi });
          const res = await axios.post("http://localhost:2371/showdien", { ...infoThem, chiPhi });
          console.log(2);
          /* eslint-disable no-await-in-loop */
          for (let i = 0; i < listcasiThem.length; ) {
            console.log(1);
            console.log({
              maShow: res.data.id,
              maCS: listcasiThem[i],
            });
            await axios.post("http://localhost:2371/casishow", {
              maShow: res.data.id,
              maCS: listcasiThem[i],
            });
            i += 1;
          }
          setmess("đặt thành công!");
          setInfoThem({});
          setListcasiThem([]);
          setChiPhi(0);
        }}
        variant="contained"
      >
        <p
          style={{
            color: "white",
          }}
        >
          ĐẶT
        </p>
      </Button>
    </div>
  );
}
export default DatShow;
