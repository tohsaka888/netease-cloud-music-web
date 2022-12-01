import { Layout } from "antd";
import PlaylistDetail from "components/Common/PlaylistDetail";
import { useRouter } from "next/router";
import React from "react";
import styles from "./index.module.css";

function Content() {
  const { query } = useRouter();
  return (
    <Layout.Content className={styles["content-container"]}>
      <div className={styles["content-main"]}>
        <PlaylistDetail key={query.id as string} />
      </div>
    </Layout.Content>
  );
}

export default Content;
