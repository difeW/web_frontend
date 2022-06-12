import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import SignIn from "../authenticationUser/sign-in";
import BaiHat from "./component/BaiHat/BaiHat";
import CaSi from "./component/CaSi/CaSi";
import ChiTietCaSi from "./component/ChiTietCaSi/ChiTietCaSi";
import { UserContext } from "./component/context/UserContext";
import DatShow from "./component/DatShow/DatShow";
import Layout from "./component/layout/Layout";

function Client() {
  const { id } = useContext(UserContext);
  console.log(id);
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home/*" element={<Layout />}>
        <Route path="casi" element={<CaSi />} />
        <Route path="chitietcasi" element={<ChiTietCaSi />} />
        <Route path="baihat" element={<BaiHat />} />
        <Route path="datshow" element={<DatShow />} />
      </Route>
    </Routes>
  );
}
export default Client;
