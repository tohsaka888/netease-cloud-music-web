import useHotDj from "@services/useHotDj";
import MultipleLines from "components/Common/MultipleLines";
import Image from "next/image";
import React, { useMemo } from "react";
import styles from "./index.module.css";

function HotDj() {
  const { data } = useHotDj();
  const list = useMemo(() => data?.toplist || [], []);
  return (
    <div className={styles["sider-container"]}>
      <div className={styles["sider-title"]}>
        <span style={{ fontWeight: "bold" }}>热门主播</span>
      </div>
      {list.map((item) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 0px",
              cursor: "pointer",
            }}
            key={item.id}
          >
            <Image
              width={40}
              height={40}
              src={item.picUrl}
              alt={item.id.toString()}
            />
            <div style={{ marginLeft: "8px", fontSize: "10px" }}>
              <MultipleLines
                lines={1}
                maxWidth={"100%"}
                style={{ marginBottom: "8px" }}
              >
                {item.name}
              </MultipleLines>
              <MultipleLines
                lines={1}
                maxWidth={"100%"}
                style={{ color: "#666" }}
              >
                {item.rcmdtext || "暂无介绍"}
              </MultipleLines>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HotDj;
