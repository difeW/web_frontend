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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";

function Overview() {
  const [profilesListData, setList] = useState([]);
  const [info, setInfo] = useState(null);
  const location = useLocation();
  useEffect(async () => {
    const res = await axios.get(`http://localhost:2371/casi/${location.state.id}`);
    setInfo(res.data[0]);
    const list = res.data[0].tenBh.map((e) => ({
      image: e.hinhAnh,
      name: e.tenBH,
      description: `Lượt mua: ${e.luotMua}${"      "}Lượt xem: ${e.luotView}`,
      action: {
        type: "internal",
        route: "/pages/profile/profile-overview",
        color: "info",
        label: "Play",
      },
    }));
    setList(list);
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {info && (
        <Header dt={info}>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4}>
                <div
                  style={{
                    padding: 10,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Mô tả
                </div>
                <div
                  style={{
                    padding: 10,
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#777",
                  }}
                >
                  {info.moTa}
                </div>
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                {info && (
                  <ProfileInfoCard
                    title="Thông tin cá nhân"
                    info={{
                      id: location.state.id,
                      "Họ và tên": info.hoTen,
                      "Số điện thoại": info.sdt,
                      email: info.email,
                      "Địa Chỉ": info.diaChi,
                      Hạng: info.maHang,
                      "Ngày sinh": info.ngaySinh,
                      "Ngày vào làm": info.ngayVao,
                      Lương: info.luongCB,
                      CMND: info.CMND,
                      "Giới tính": info.gioiTinh,
                      "Hình ảnh": info.hinhAnh,
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/CreativeTim/",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com/creativetim",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com/creativetimofficial/",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                    ]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                )}
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} xl={4}>
                <ProfilesList
                  title="Danh sách bài hát"
                  profiles={profilesListData}
                  shadow={false}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Header>
      )}
    </DashboardLayout>
  );
}

export default Overview;
