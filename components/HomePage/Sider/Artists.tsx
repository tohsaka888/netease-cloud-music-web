import useHotArtists from "@services/useHotArtists";
import Image from "next/image";
import React, { useMemo } from "react";
import styles from "./index.module.css";

function Artists() {
  const { data } = useHotArtists();
  const artists = useMemo(() => data?.artists, []);

  return (
    <div className={styles["sider-container"]}>
      <div className={styles["sider-title"]}>
        <span style={{ fontWeight: "bold" }}>入驻歌手</span>
        <span>查看全部{">"}</span>
      </div>
      {artists?.map((artist) => {
        return (
          <div className={styles["artist-container"]}>
            <Image
              width={62}
              height={62}
              alt={artist.img1v1Id_str}
              src={artist.img1v1Url}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Artists;
