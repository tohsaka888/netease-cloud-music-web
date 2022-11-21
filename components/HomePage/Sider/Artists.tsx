import useHotArtists from "@services/useHotArtists";
import MultipleLines from "components/Common/MultipleLines";
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
          <div className={styles["artist-container"]} key={artist.id}>
            <Image
              width={62}
              height={62}
              alt={artist.img1v1Id_str}
              src={artist.img1v1Url}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "12px",
              }}
            >
              <MultipleLines
                lines={1}
                maxWidth={"100%"}
                style={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}
              >
                {artist.name}
              </MultipleLines>
              <MultipleLines
                lines={1}
                maxWidth={"100%"}
                style={{ fontSize: "12px", marginTop: "6px" }}
              >
                {artist.alias.join(",")}
              </MultipleLines>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Artists;
