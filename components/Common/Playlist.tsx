import React, { Key, useMemo } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import globalStyles from "styles/global.module.css";
import MultipleLines from "./MultipleLines";
import { useRouter } from "next/router";

type Props = {
  playcount: number;
  picUrl: string;
  name: string;
  id: Key;
};

function Playlist({ playcount, picUrl, name, id }: Props) {
  const { push } = useRouter();

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
      onClick={() => push(`/playlist/${id}`)}
    >
      <Image src={picUrl} alt={picUrl} width={140} height={140} priority />
      <div className={styles["playlist-mask"]} />
      <MultipleLines lines={2} maxWidth={"140px"} style={{ marginTop: "8px" }}>
        {name}
      </MultipleLines>
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
