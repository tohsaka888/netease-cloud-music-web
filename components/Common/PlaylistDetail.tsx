import usePlaylistDetail from "@services/usePlaylistDetail";
import { Avatar, Button, Tag, Typography, Table, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import globalStyle from "styles/global.module.css";
import styles from "./index.module.css";
import day from "dayjs";
import {
  BsArrowDown,
  BsArrowUp,
  BsCollection,
  BsDownload,
  BsFillChatLeftTextFill,
  BsFillPinMapFill,
  BsPlayCircle,
  BsShare,
} from "react-icons/bs";
import { ColumnType } from "antd/es/table";
import { Ar, Track, Al } from "types";
import NeteaseIcon from "./NeteaseIcons";
import usePlaylistTracks from "@services/usePlaylistTracks";
import { KnowledgeGraph } from "react-knowledge-graph";
import useGraphData from "@services/useGraphData";

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

function PlaylistDetail() {
  const { query } = useRouter();
  const [pageConfig, setPageConfig] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 20,
  });
  const [open, setOpen] = useState<boolean>(false);

  const { data: detail } = usePlaylistDetail({
    id: +(query.id as string),
  });
  const { data: tracks } = usePlaylistTracks({
    id: +(query.id as string),
    ...pageConfig,
  });
  const [ellipsis, setEllipsis] = useState<boolean>(true);
  const [isShowEllipsisButton, setIsShowEllipsisButton] =
    useState<boolean>(false);
  const { explore } = useGraphData();

  const columns: ColumnType<Track>[] = useMemo(
    () => [
      {
        title: "",
        dataIndex: "index",
        key: "index",
        width: 75,
        render(_, __, index) {
          return (
            <div
              className={globalStyle["flex-align-center"]}
              style={{ justifyContent: "space-between", padding: "0px 8px" }}
            >
              <div>{index + 1}</div>
              <NeteaseIcon name="play-small" size={1} />
            </div>
          );
        },
      },
      {
        title: "歌曲标题",
        dataIndex: ["name"],
        key: "name",
        ellipsis: {
          showTitle: true,
        },
        width: 300,
        render(text, record) {
          return (
            <div className={globalStyle["flex-align-center"]}>
              <div>{text}</div>
              {record.alia.length !== 0 && (
                <div style={{ color: "#999" }}>
                  <span style={{ padding: "0px 4px" }}>-</span>
                  {record.alia.join("-")}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: "时长",
        dataIndex: ["dt"],
        key: "dt",
        render(text: number) {
          return day(text).format("mm:ss");
        },
        width: 100,
      },
      {
        title: "歌手",
        dataIndex: ["ar"],
        key: "ar",
        render(text: Ar[]) {
          return text.map((ar) => ar.name).join("/");
        },
        width: 110,
        ellipsis: {
          showTitle: true,
        },
      },
      {
        title: "专辑",
        dataIndex: ["al", "name"],
        key: "al",
        width: 150,
        ellipsis: {
          showTitle: true,
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ padding: "40px", display: "flex", position: "relative" }}>
        <div className={styles["cover-image-container"]}>
          <Image
            width={200}
            height={200}
            src={detail?.playlist.coverImgUrl! + "?param=200y200"}
            alt={detail?.playlist.id.toString() || ""}
          />
          <div className={styles["cover-image-mask"]} />
        </div>
        <div style={{ marginLeft: "36px" }}>
          <div className={globalStyle["flex-align-center"]}>
            <div className={styles["playlist-tag"]} />
            <div style={{ fontSize: "20px" }}>{detail?.playlist.name}</div>
          </div>

          <div
            className={globalStyle["flex-align-center"]}
            style={{ marginTop: "8px" }}
          >
            <Avatar
              src={detail?.playlist.creator.avatarUrl}
              size={38}
              style={{ border: "1px sold #dfdfdf" }}
            />
            <div
              style={{ fontSize: "10px", color: "#0c73c2", marginLeft: "8px" }}
            >
              {detail?.playlist.creator.nickname}
            </div>
            <div style={{ fontSize: "10px", color: "#999", marginLeft: "8px" }}>
              {day(detail?.playlist.createTime!).format("YYYY-MM-DD")} 创建
            </div>
          </div>

          <Button
            type={"primary"}
            style={{ position: "absolute", top: "75px", right: "10px" }}
            onClick={() => setOpen(true)}
          >
            <BsFillPinMapFill
              style={{ position: "absolute", left: "12px", top: "7px" }}
            />
            <div style={{ marginLeft: "16px" }}>图谱分析</div>
          </Button>

          <Modal
            open={open}
            title={"图谱分析"}
            width={1200}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            <KnowledgeGraph
              basicDistence={80}
              explore={explore}
              enableAutoExplore={true}
              node={{
                id: query.id!.toString(),
                name: detail!.playlist.name,
                type: "歌单",
                hasMore: true,
                direction: "root",
              }}
              position={{
                x: 600,
                y: 260,
              }}
              width={"100%"}
              height={580}
              showFilter={false}
              showNodeMenu={true}
              typeConfig={{
                ["收藏者"]: {
                  radius: 18,
                  typeSize: 8,
                  nameSize: 8,
                  nameColor: "#666",
                  fill: "#89e8e6",
                  hoverStyle: {
                    fill: "#30e4e1",
                  },
                },
                ["创建者"]: {
                  radius: 22,
                  fill: "#d389e8",
                  hoverStyle: {
                    fill: "#b130e4",
                  },
                },
                ["歌曲"]: {
                  fill: "#e8a189",
                  hoverStyle: {
                    fill: "#e46930",
                  },
                },
              }}
            />
          </Modal>

          <div
            style={{ marginTop: "8px" }}
            className={globalStyle["flex-align-center"]}
          >
            <Button type={"primary"} style={{ position: "relative" }}>
              <BsPlayCircle
                style={{ position: "absolute", left: "12px", top: "9px" }}
              />
              <div style={{ marginLeft: "16px" }}>播放</div>
            </Button>
            <Button style={{ marginLeft: "8px" }} disabled>
              <BsCollection
                style={{ position: "absolute", left: "12px", top: "9px" }}
              />
              <div style={{ marginLeft: "16px" }}>收藏</div>
            </Button>
            <Button style={{ marginLeft: "8px" }}>
              <BsShare
                style={{ position: "absolute", left: "12px", top: "9px" }}
              />
              <div style={{ marginLeft: "16px" }}>分享</div>
            </Button>
            <Button style={{ marginLeft: "8px" }}>
              <BsDownload
                style={{ position: "absolute", left: "12px", top: "9px" }}
              />
              <div style={{ marginLeft: "16px" }}>下载</div>
            </Button>
            <Button style={{ marginLeft: "8px" }}>
              <BsFillChatLeftTextFill
                style={{ position: "absolute", left: "12px", top: "9px" }}
              />
              <div style={{ marginLeft: "16px" }}>
                评论 {"(" + detail?.playlist.commentCount + ")"}
              </div>
            </Button>
          </div>
          <div
            className={globalStyle["flex-align-center"]}
            style={{ marginTop: "12px" }}
          >
            {detail?.playlist.tags.length !== 0 && <div>标签：</div>}
            {detail?.playlist.tags.length !== 0 &&
              detail?.playlist.tags.map((tag, idx) => {
                return (
                  <Tag color={colors[idx]} key={idx}>
                    {tag}
                  </Tag>
                );
              })}
          </div>

          <Typography style={{ marginTop: "8px" }}>
            <Typography.Paragraph
              style={{ whiteSpace: "pre-wrap" }}
              ellipsis={
                ellipsis
                  ? {
                      rows: 3,
                      onEllipsis() {
                        setIsShowEllipsisButton(true);
                      },
                    }
                  : false
              }
            >
              {detail?.playlist.description}
            </Typography.Paragraph>
          </Typography>

          {isShowEllipsisButton && (
            <div
              className={globalStyle["flex-align-center"]}
              style={{
                color: "#1890ff",
                cursor: "pointer",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                setEllipsis(!ellipsis);
              }}
            >
              {ellipsis ? (
                <>
                  <div>展开</div>
                  <BsArrowDown style={{ paddingTop: "3px" }} />
                </>
              ) : (
                <>
                  <div>收起</div>
                  <BsArrowUp style={{ paddingTop: "3px" }} />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles["playlist-table-title"]}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "8px",
          }}
        >
          <div style={{ fontSize: "20px" }}>歌曲列表</div>
          <div
            style={{ margin: "9px 0 0 20px", fontSize: "10px", color: "#666" }}
          >
            {detail?.playlist.trackCount}首歌
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "8px",
          }}
        >
          播放：
          <span
            style={{ color: "#c20c0c", fontWeight: "bold", marginRight: "8px" }}
          >
            {detail?.playlist.playCount}
          </span>
          次
        </div>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={tracks || []}
        pagination={{
          ...pageConfig,
          // size: "default",
          total: detail?.playlist.trackCount,
          onChange(page, pageSize) {
            setPageConfig({ page, pageSize });
          },
          showPrevNextJumpers: true,
          showQuickJumper: true,
          showSizeChanger: true,
          showLessItems: true,
          showTitle: true,
        }}
        className={"playlist-table"}
      />
    </>
  );
}

export default PlaylistDetail;
