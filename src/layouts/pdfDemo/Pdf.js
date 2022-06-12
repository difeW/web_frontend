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
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@mui/material";

function Pdf() {
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

  return (
    <div>
      <Button
        onClick={() => {
          outputPdf();
        }}
      >
        Click vào để xuất file
      </Button>
      <div
        id="content"
        style={{
          position: "fixed",
          left: "100vw",
          width: "790px",
        }}
      >
        Nội dung trong này sẽ được xuất ra file pdf
      </div>
    </div>
  );
}

export default Pdf;
