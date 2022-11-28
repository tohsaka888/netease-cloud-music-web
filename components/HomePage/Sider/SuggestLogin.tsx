import React, { useMemo } from "react";
import styles from "./index.module.css";
import globalStyles from "styles/global.module.css";
import { useDispatchModalVisible } from "context/LoginModalVisibleProvider";
import useLoginStatus from "@services/useLoginStatus";
import Image from "next/image";

function SuggestLogin() {
  const setModalVisible = useDispatchModalVisible();
  const { data: loginStatus } = useLoginStatus();
  const profile = useMemo(() => loginStatus?.data.profile, [loginStatus]);

  if (profile) {
    return (
      <div className={styles["daily-sign-container"]}>
        <div className={styles["daily-sign-avatar"]}>
          <Image
            width={80}
            height={80}
            src={profile.avatarUrl}
            alt={profile.userName}
          />
        </div>
        <div
          style={{
            marginLeft: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          <div style={{ fontSize: "14px", color: "#333", fontWeight: "bold" }}>
            {profile.nickname}
          </div>
          <div className={styles.level}>
            {profile.vipType}
            <div className={styles["level-right"]} />
          </div>
          <div className={styles["daily-sign-button"]}>
            <div className={styles["daily-sign-button-inner"]}>
              签 到
            </div>
          </div>
        </div>
      </div>
    );
  } else {
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
          <div
            className={styles["login-button"]}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            用户登录
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestLogin;
