import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
  const nav = useNavigate();
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>BIGHIT</div>
        <div className={styles.nav}>
          <Link to="casi" className={styles.item}>
            CA SĨ
          </Link>
          <Link to="baihat" className={styles.item}>
            BÀI HÁT
          </Link>
          <Link to="datshow" className={styles.item}>
            ĐẶT SHOW
          </Link>
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              nav("/client");
            }}
            onKeyDown={() => {
              console.log(1);
            }}
            className={styles.item}
          >
            ĐĂNG XUẤT
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.container_item}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
