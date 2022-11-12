import usePlaylistDetail from "@services/usePlaylistDetail";
import { ColumnType } from "antd/lib/table";
import { Table } from "antd";
import { newId, originId, solarId } from "config/toplistIds";
import React, { useMemo, useState } from "react";
import PartTitle from "./PartTitle";
import { Playlist, PlaylistDetailResponse } from "types";
import globalStyle from "styles/global.module.css";
import styles from "../index.module.css";
import MultipleLines from "components/Common/MultipleLines";
import Image from "next/image";
import NeteaseIcon from "components/Common/NeteaseIcons";
import { motion } from "framer-motion";

function ToplistTable({
  soarData,
  newData,
  originData,
}: {
  soarData: PlaylistDetailResponse;
  newData: PlaylistDetailResponse;
  originData: PlaylistDetailResponse;
}) {
  const dataSource = useMemo(() => {
    const res = [];
    if (soarData && newData && originData) {
      for (let i = 0; i < 10; i++) {
        res.push({
          soar: {
            ...soarData.playlist.tracks[i],
          },
          new: {
            ...newData.playlist.tracks[i],
          },
          origin: {
            ...originData.playlist.tracks[i],
          },
        });
      }
      res.push({
        soar: { name: "查看全部>" },
        new: { name: "查看全部>" },
        origin: { name: "查看全部>" },
      });
    }
    return res;
  }, [soarData, newData, originData]);

  const ColumnRender = ({
    val,
    record,
    index,
  }: {
    val: Playlist;
    record: Record<string, Playlist>;
    index: number;
  }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
      <motion.div
        onHoverStart={() => {
          setIsHover(true);
        }}
        onHoverEnd={() => {
          setIsHover(false);
        }}
      >
        {val.name.includes("查看全部") ? (
          <div className={styles["read-more"]}>{val.name}</div>
        ) : (
          <div className={globalStyle["flex-align-center"]}>
            <div
              className={styles["top-index"]}
              style={{ color: index <= 2 ? "#c10d0c" : "#666" }}
            >
              {index + 1}
            </div>
            <MultipleLines
              lines={1}
              maxWidth={"100%"}
              style={{
                flex: 1,
                cursor: "pointer",
                userSelect: "none",
                fontSize: "12px",
              }}
              className={styles["toplist-song-name"]}
            >
              {val.name}
            </MultipleLines>
            <motion.div
              className={globalStyle["flex-align-center"]}
              initial={{ display: "none" }}
              animate={{
                display: isHover ? "flex" : "none",
              }}
            >
              <NeteaseIcon name={"play-small"} />
              <NeteaseIcon
                name={"add"}
                style={{
                  marginTop: "4px",
                  marginLeft: "6px",
                  marginRight: "6px",
                }}
              />
              <NeteaseIcon name={"collect-small"} />
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  };

  const columnTitle = (playlist: Playlist) => {
    return (
      <div className={styles["column-title-container"]}>
        <Image
          src={playlist.coverImgUrl}
          alt={playlist.coverImgId_str}
          width={80}
          height={80}
        />
        <div className={styles["playlist-mask"]} />
        <div className={styles["column-title-playlist-container"]}>
          <div>{playlist.name}</div>
          <div className={globalStyle["flex-align-center"]}>
            <NeteaseIcon
              name={"play"}
              style={{ marginTop: "8px", marginRight: "16px" }}
            />
            <NeteaseIcon name={"collect"} style={{ marginTop: "8px" }} />
          </div>
        </div>
      </div>
    );
  };

  const columns: ColumnType<any>[] = useMemo(() => {
    return [
      {
        title: columnTitle(soarData!.playlist),
        key: "soar",
        dataIndex: "soar",
        width: "calc(100% / 3)",
        ellpsis: true,
        render(val, record, index) {
          return <ColumnRender val={val} record={record} index={index} />;
        },
      },
      {
        title: columnTitle(newData!.playlist),
        key: "new",
        dataIndex: "new",
        width: "calc(100% / 3)",
        ellpsis: true,
        render(val, record, index) {
          return <ColumnRender val={val} record={record} index={index} />;
        },
      },
      {
        title: columnTitle(originData!.playlist),
        key: "origin",
        width: "calc(100% / 3)",
        dataIndex: "origin",
        ellpsis: true,
        render(val, record, index) {
          return <ColumnRender val={val} record={record} index={index} />;
        },
      },
    ];
  }, [soarData, newData, originData]);
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      className={"toplist-table"}
      bordered
      style={{
        overflow: "hidden",
        width: "100%",
      }}
    />
  );
}

function Toplists() {
  const { data: soarData } = usePlaylistDetail({ id: +solarId! });
  const { data: newData } = usePlaylistDetail({ id: +newId! });
  const { data: originData } = usePlaylistDetail({ id: +originId! });

  return (
    <>
      <PartTitle>榜单</PartTitle>
      {soarData && newData && originData ? (
        <ToplistTable
          soarData={soarData}
          newData={newData}
          originData={originData}
        />
      ) : (
        <Table
          loading
          pagination={false}
          className={"toplist-table"}
          bordered
          columns={[
            {
              title: "飙升榜",
            },
            {
              title: "新歌榜",
            },
            {
              title: "原创榜",
            },
          ]}
        />
      )}
    </>
  );
}

export default Toplists;
