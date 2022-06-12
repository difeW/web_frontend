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

// react-routers components

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";
// Material Dashboard 2 React base styles
import { useState } from "react";
import { Input } from "@mui/material";

function ProfileInfoCard({ title, info, action, shadow }) {
  const labels = [];
  const values = [];
  const [type, setType] = useState(true);

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);
      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));
  const [infoupdate, setInfoupdate] = useState({
    id: values[0],
    hoTen: values[1],
    sdt: values[2],
    email: values[3],
    diaChi: values[4],
    maHang: values[5],
    ngaySinh: values[6],
    ngayVao: values[7],
    luongCB: values[8],
    CMND: values[9],
    hinhAnh: values[11],
    gioiTinh: values[10],
    doanhThu: 1000,
    moTa: "moTa",
  });
  const handleChange = (e) => {
    if (e.target.name === "hinhAnh") {
      let fileImage = e.target.value;
      fileImage = fileImage.slice(12);
      setInfoupdate({ ...infoupdate, hinhAnh: fileImage });
    } else setInfoupdate({ ...infoupdate, [e.target.name]: e.target.value });
  };
  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));
  const renderItems2 = labels.map((label, key) => {
    if (label === " ngày sinh") {
      return (
        <MDBox key={label} display="flex" py={1} pr={2}>
          <MDTypography
            style={{
              width: "40%",
            }}
            variant="button"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {label}: &nbsp;
          </MDTypography>
          <Input
            name="ngaySinh"
            onChange={(e) => {
              handleChange(e);
            }}
            style={{
              width: "60%",
            }}
            type="date"
            value={info.ngaySinh}
            variant="button"
            fontWeight="regular"
            color="text"
          >
            &nbsp;{label}
          </Input>
        </MDBox>
      );
    }
    if (label === " hình ảnh") {
      return (
        <MDBox key={label} display="flex" py={1} pr={2}>
          <MDTypography
            style={{
              width: "40%",
            }}
            variant="button"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {label}: &nbsp;
          </MDTypography>
          <Input
            name="hinhAnh"
            onChange={(e) => {
              handleChange(e);
            }}
            style={{
              width: "60%",
            }}
            type="file"
            value=""
            variant="button"
            fontWeight="regular"
            color="text"
          >
            &nbsp;{label}
          </Input>
        </MDBox>
      );
    }
    if (label === " ngày vào làm") {
      return (
        <MDBox key={label} display="flex" py={1} pr={2}>
          <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
            {label}: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontWeight="regular" color="text">
            &nbsp;{values[key]}
          </MDTypography>
        </MDBox>
      );
    }
    if (label === "id") return "";
    return (
      <MDBox key={label} display="flex" py={1} pr={2}>
        <MDTypography
          style={{
            width: "40%",
          }}
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}: &nbsp;
        </MDTypography>
        <Input
          onChange={(e) => {
            handleChange(e);
          }}
          name={((string) => {
            switch (string) {
              case " họ và tên":
                return "hoTen";
              case " số điện thoại":
                return "sdt";
              case "email":
                return "email";
              case "Địa  chỉ":
                return "diaChi";
              case " hạng":
                return "maHang";
              case " lương":
                return "luongCB";
              case " giới tính":
                return "gioiTinh";
              case " cMND":
                return "CMND";
              default:
                return "";
            }
          })(label)}
          style={{
            width: "60%",
          }}
          value={((string) => {
            switch (string) {
              case " họ và tên":
                return infoupdate.hoTen;
              case " số điện thoại":
                return infoupdate.sdt;
              case "email":
                return infoupdate.email;
              case "Địa  chỉ":
                return infoupdate.diaChi;
              case " hạng":
                return infoupdate.maHang;
              case " lương":
                return infoupdate.luongCB;
              case " giới tính":
                return infoupdate.gioiTinh;
              case " cMND":
                return infoupdate.CMND;
              default:
                return "";
            }
          })(label)}
          variant="button"
          fontWeight="regular"
          color="text"
        >
          &nbsp;{label}
        </Input>
      </MDBox>
    );
  });
  return type ? (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <div
          style={{
            cursor: "pointer",
          }}
        >
          <MDTypography
            onClick={() => {
              setType(false);
            }}
            variant="body2"
            color="secondary"
          >
            <Tooltip title={action.tooltip} placement="top">
              <Icon>edit</Icon>
            </Tooltip>
          </MDTypography>
        </div>
      </MDBox>
      <MDBox p={2}>
        <MDBox>{renderItems}</MDBox>
      </MDBox>
    </Card>
  ) : (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <div
          style={{
            cursor: "pointer",
          }}
        >
          <MDTypography
            onClick={() => {
              setType(true);
            }}
            variant="body2"
            color="secondary"
          >
            <Tooltip title="Hủy" placement="top">
              <Icon>cancel</Icon>
            </Tooltip>
          </MDTypography>
        </div>
        <div
          style={{
            cursor: "pointer",
          }}
        >
          <MDTypography
            onClick={async () => {
              console.log(infoupdate);
              await axios.patch(`http://localhost:2371/casi/${infoupdate.id}`, infoupdate);
              setType(true);
            }}
            variant="body2"
            color="secondary"
          >
            <Tooltip title="Xác nhận" placement="top">
              <Icon>check</Icon>
            </Tooltip>
          </MDTypography>
        </div>
      </MDBox>
      <MDBox p={2}>
        <MDBox>{renderItems2}</MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
