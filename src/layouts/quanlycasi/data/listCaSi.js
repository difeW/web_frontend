/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function data(list) {
  const navigation = useNavigate();
  const Author = ({ image, name, email }) => {
    console.log(image);
    return (
      image && (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          {/* eslint-disable global-require */}
          <MDAvatar
            src={require(`../../../assets/images/${image}`)} //  eslint-disable-line import/no-dynamic-require
            name={name}
            size="sm"
          />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {name}
            </MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
          </MDBox>
        </MDBox>
      )
    );
  };

  return {
    columns: [
      { Header: "Ca sĩ", accessor: "casi", width: "45%", align: "left" },
      { Header: "Hạng", accessor: "function", align: "left" },
      { Header: "Giới tính", accessor: "gioitinh", align: "center" },
      { Header: "Ngày sinh", accessor: "ngayVaoLam", align: "center" },
      { Header: "Điều khiển", accessor: "dieuKhien", align: "center" },
    ],
    rows: list.map((item) => ({
      casi: <Author image={item.hinhAnh} name={item.hoTen} email={item.email} />,
      function: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={item.maHang} color="success" variant="gradient" size="md" />
        </MDBox>
      ),
      gioitinh: (
        <MDBox lineHeight={1} textAlign="left">
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {item.gioiTinh}
          </MDTypography>
        </MDBox>
      ),
      ngayVaoLam: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.ngaySinh}
        </MDTypography>
      ),
      dieuKhien: (
        <Button
          onClick={() => {
            navigation("/quanlycasi/profile", {
              state: {
                id: item.id,
              },
            });
          }}
        >
          Xem
        </Button>
      ),
    })),
    // rows: [
    //   {
    //     casi: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="A" color="success" variant="gradient" size="md" />
    //       </MDBox>
    //     ),
    //     gioitinh: (
    //       <MDBox lineHeight={1} textAlign="left">
    //         <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
    //           Nam
    //         </MDTypography>
    //       </MDBox>
    //     ),
    //     ngayVaoLam: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         20-06-2001
    //       </MDTypography>
    //     ),
    //     dieuKhien: (
    //       <Button
    //         onClick={() => {
    //           navigation("/quanlycasi/profile", {
    //             state: {
    //               id: "111",
    //             },
    //           });
    //         }}
    //       >
    //         Xem
    //       </Button>
    //     ),
    //   },
    // ],
  };
}
