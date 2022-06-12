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

// @mui material components

export default function data(dt) {
  return {
    columns: [
      { Header: "Tên ca sĩ", accessor: "companies", width: "45%", align: "left" },
      { Header: "Hạng", accessor: "members", width: "10%", align: "left" },
      { Header: "Doanh thu", accessor: "budget", align: "center" },
      { Header: "Ngày sinh", accessor: "completion", align: "center" },
    ],

    rows: dt
      ? dt
          .map((e) => ({
            companies: <p>{e.hoTen}</p>,
            members: <p>{e.hang}</p>,
            budget: <p>{e.doanhso}</p>,
            completion: <p>{e.ngaySinh}</p>,
          }))
          .slice(0, 3)
      : [],
  };
}
