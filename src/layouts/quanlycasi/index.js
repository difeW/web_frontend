/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import listCaSi from "layouts/quanlycasi/data/listCaSi";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import axios from "axios";

function CaSi() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const [list, setlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [infoThem, setInfoThem] = useState({
    ngayVao: `${yyyy}-${mm}-${dd}`,
    doanhThu: 10000,
  });
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/casi");
    setlist(res.data);
  }, [open]);
  const { columns, rows } = listCaSi(list);

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeThem = (e) => {
    if (e.target.name === "hinhAnh") {
      let fileImage = e.target.value;
      fileImage = fileImage.slice(12);
      setInfoThem({ ...infoThem, hinhAnh: fileImage });
    } else setInfoThem({ ...infoThem, [e.target.name]: e.target.value });
  };
  const handleAddCaSi = async () => {
    await axios.post("http://localhost:2371/casi", infoThem);
    setOpen(false);
    setInfoThem({});
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <MDTypography variant="h6" color="white">
                    Danh sách Ca Sĩ
                  </MDTypography>
                  <MDButton
                    onClick={() => {
                      setOpen(true);
                    }}
                    color="dark"
                  >
                    Thêm ca sĩ
                  </MDButton>
                </div>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Modal
        open={open}
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
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: 16, marginBottom: 20, fontWeight: "700" }}>THÊM CA SĨ</p>
          <TextField
            style={{
              width: "90%",
              marginBottom: 10,
            }}
            onChange={(e) => {
              onChangeThem(e);
            }}
            name="hoTen"
            label="Họ tên"
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
              onChangeThem(e);
            }}
            name="sdt"
            label="Số điện thoại"
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
              onChangeThem(e);
            }}
            name="CMND"
            label="CMND"
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
            name="email"
            label="Email"
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
              onChangeThem(e);
            }}
            name="gioiTinh"
            label="Giới tính"
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
              onChangeThem(e);
            }}
            name="diaChi"
            label="Địa Chỉ"
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
              onChangeThem(e);
            }}
            name="maHang"
            label="Hạng"
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
              onChangeThem(e);
            }}
            name="ngaySinh"
            label="Ngày Sinh"
            type="date"
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
              onChangeThem(e);
            }}
            type="number"
            name="luongCB"
            label="Lương"
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
              onChangeThem(e);
            }}
            name="moTa"
            label="Mô tả"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              onChangeThem(e);
            }}
            style={{
              width: "90%",
              marginBottom: 10,
            }}
            type="file"
            name="hinhAnh"
            label="Hình Ảnh"
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
          <div>
            <Button
              onClick={() => {
                handleAddCaSi();
              }}
              variant="contained"
              size="large"
              color="primary"
            >
              <p style={{ color: "white" }}>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default CaSi;
