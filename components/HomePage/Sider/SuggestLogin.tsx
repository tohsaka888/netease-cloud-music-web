import React from "react";
import styles from "./index.module.css";
import globalStyles from "styles/global.module.css";

function SuggestLogin() {
  return (
    <div className={styles["suggest-login-container"]}>
      <div
        style={{
          fontSize: "10px",
          color: "#666",
          padding: "16px 24px",
          lineHeight: "22px",
        }}
      >
        登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
      </div>
      <div className={globalStyles["flex-all-center"]}>
        <div className={styles["login-button"]}>用户登录</div>
      </div>
    </div>
  );
}

export default SuggestLogin;
