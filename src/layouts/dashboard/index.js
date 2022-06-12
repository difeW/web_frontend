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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import axios from "axios";

import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import styles from "./index.module.css";

function Dashboard() {
  const [modal, setmodal] = useState(false);
  const [dt, setdt] = useState(0);
  const [kh, setkh] = useState(0);
  const [cs, setcs] = useState(0);
  const [bh, setbh] = useState(0);
  const [topcs, settopcs] = useState([]);
  const [list, setlist] = useState([]);
  const exportPDF = () => {
    const input = document.getElementById("content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      /*    eslint new-cap: ["error", { "newIsCap": false }]    */
      const Pd = new jsPDF("p", "mm", "a4");
      Pd.addImage(imgData, "PNG", 1, 1);
      Pd.save("File.pdf");
    });
  };
  const outputPdf = () => {
    exportPDF();
  };
  const [report, setreport] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: { label: "Vnd", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  });
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/dashboard/doanhthu");
    setdt(res.data);
  }, []);
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/dashboard/nam");
    console.log(res.data);
    setlist(res.data);
    let newlist = { ...report };
    newlist = { ...newlist, datasets: { ...newlist.datasets, data: res.data } };
    setreport({ ...newlist });
  }, []);
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/dashboard/topcasi");
    console.log(res.data);
    console.log(topcs);
    settopcs(res.data);
  }, []);
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/dashboard/khachhang");
    setkh(res.data);
  }, []);
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/dashboard/baihat");
    setbh(res.data);
  }, []);
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/dashboard/casi");
    setcs(res.data);
  }, []);
  const handleClose = () => {
    setmodal(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Tổng doanh thu"
                count={dt}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard icon="leaderboard" title="Tổng số khách hàng" count={kh} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Tổng số bài hát"
                count={bh}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Tổng số ca sĩ"
                count={cs}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox
          style={{
            position: "relative",
          }}
          mt={4.5}
          mb={4.5}
        >
          <ReportsBarChart color="info" title="Doanh thu theo tháng" chart={report} />
          <Button
            onClick={() => {
              setmodal(true);
            }}
            style={{
              bottom: 10,
              right: 10,
              position: "absolute",
              backgroundColor: "orange",
              zIndex: 1000,
            }}
          >
            <p
              style={{
                color: "white",
              }}
            >
              PDF
            </p>
          </Button>
        </MDBox>
        <MDBox>
          <Projects dt={topcs} />
        </MDBox>
      </MDBox>
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
          id="contained"
          style={{
            backgroundColor: "white",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            height: "90%",
            overflowY: "scroll",
          }}
        >
          <div
            id="content"
            style={{
              width: "100%",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className={styles.thanh}> </div>
            <div className={styles.tt}>
              <div className={styles.logo}>BIGHIT</div>
              <div className={styles.sdt}>BIGHIT GROUP</div>
            </div>
            <h4>BÁO CÁO DOANH THU</h4>
            <p style={{ fontSize: 12 }}>(Doanh thu của BigHit năm 2022)</p>
            <table className={styles.table}>
              <thead
                style={{
                  backgroundColor: "red",
                }}
              >
                <tr>
                  <th className={styles.th}>Tháng</th>
                  <th className={styles.th}>Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((e, i) => (
                    <tr className={styles.tr}>
                      <td className={styles.t}>Tháng {i + 1}</td>
                      <td className={styles.t}>{e}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <MDBox mt={10} mb={4.5} width={580}>
              <ReportsBarChart color="info" title="Doanh thu theo tháng" chart={report} />
            </MDBox>
            <p className={styles.ngay}>13-06-2022</p>
            <div className={styles.thanh}> </div>
          </div>
          <Button
            onClick={() => {
              outputPdf();
            }}
          >
            Xuất
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
