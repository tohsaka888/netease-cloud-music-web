import usePlaylistDetail from "@services/usePlaylistDetail";
import { ColumnType } from "antd/lib/table";
import { Table } from "antd";
import { newId, originId, solarId } from "config/toplistIds";
import React, { useMemo } from "react";
import PartTitle from "./PartTitle";
import { Playlist } from "types";

function Toplists() {
  const { data: soarData } = usePlaylistDetail({ id: +solarId! });
  const { data: newData } = usePlaylistDetail({ id: +newId! });
  const { data: originData } = usePlaylistDetail({ id: +originId! });

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
    }
    return res;
  }, [soarData, newData, originData]);

  const columns: ColumnType<any>[] = useMemo(() => {
    return [
      {
        title: <span>飙升榜</span>,
        key: "soar",
        dataIndex: "soar",
        render(val: Playlist, record, index) {
          return <span>{val.name}</span>;
        },
      },
      {
        title: <span>新歌榜</span>,
        key: "new",
        dataIndex: "new",
        render(val: Playlist, record, index) {
          return (
            <span>
              {index + 1}
              {val.name}
            </span>
          );
        },
      },
      {
        title: <span>原创榜</span>,
        key: "origin",
        dataIndex: "origin",
        render(val: Playlist, record, index) {
          return <span>{val.name}</span>;
        },
      },
    ];
  }, [soarData, newData, originData]);

  return (
    <>
      <PartTitle>榜单</PartTitle>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
}

export default Toplists;
