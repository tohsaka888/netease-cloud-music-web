import { Layout } from "antd";
import PlaylistDetail from "components/Common/PlaylistDetail";
import React from "react";
import styles from "./index.module.css";

function Content() {
  return (
    <Layout.Content className={styles["content-container"]}>
      <div className={styles["content-main"]}>
        <PlaylistDetail />
      </div>
    </Layout.Content>
  );
}

export default Content;
