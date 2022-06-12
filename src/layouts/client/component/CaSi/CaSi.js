// import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CaSi.module.css";

function CaSi() {
  const nav = useNavigate();
  const [list, setList] = useState();
  useEffect(async () => {
    const res = await axios.get("http://localhost:2371/casi");
    setList(res.data);
  });
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {list &&
          list.map((e) => (
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
              onClick={() => {
                nav("/client/home/chitietcasi", {
                  state: {
                    id: e.id,
                  },
                });
              }}
              key={e.id}
              className={styles.itemCaSi}
            >
              {/* eslint-disable global-require */}
              <img
                className={styles.img}
                alt="hinh"
                src={e.hinhAnh ? require(`../../../../assets/images/${e.hinhAnh}`) : ""} //  eslint-disable-line import/no-dynamic-require
              />
              <div className={styles.hoTen}>{e.hoTen}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default CaSi;
