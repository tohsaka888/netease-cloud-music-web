import React, { Key, useMemo } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import globalStyles from "styles/global.module.css";

type Props = {
  playcount: number;
  picUrl: string;
  name: string;
  id: Key;
};

function Playlist({ playcount, picUrl, name, id }: Props) {
  const formattedCount = useMemo(() => {
    if (playcount >= 10000) {
      return `${(playcount / 10000).toFixed(0)}万`;
    } else {
      return playcount;
    }
  }, []);

  return (
    <div
      style={{
        minWidth: "140px",
        minHeight: "140px",
        marginBottom: "24px",
        position: "relative",
      }}
      key={id}
    >
      <Image src={picUrl} alt={picUrl} width={140} height={140} priority />
      <div className={styles["playlist-mask"]} />
      <div style={{ maxWidth: "140px", marginTop: "6px" }}>{name}</div>
      <div className={styles["playlist-controller"]}>
        <div className={globalStyles["flex-align-center"]}>
          <div className={styles["playlist-listenicon"]} />
          <div
            style={{ fontSize: "12px", marginLeft: "8px", marginTop: "2px" }}
          >
            {formattedCount}
          </div>
        </div>
        <div className={styles["playlist-playicon"]}></div>
      </div>
    </div>
  );
}

export default Playlist;
