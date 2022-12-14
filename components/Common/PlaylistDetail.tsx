import usePlaylistDetail from "@services/usePlaylistDetail";
import { Avatar, Button, Tag, Typography, Table, Modal, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { CSSProperties, useMemo, useState } from "react";
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
import { Ar, Track } from "types";
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

type Props = {
  infoStyle?: CSSProperties;
};

function PlaylistDetail({ infoStyle }: Props) {
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
        title: "????????????",
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
        title: "??????",
        dataIndex: ["dt"],
        key: "dt",
        render(text: number) {
          return day(text).format("mm:ss");
        },
        width: 100,
      },
      {
        title: "??????",
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
        title: "??????",
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

  if (detail) {
    return (
      <>
        <div
          style={{
            padding: "40px 0px",
            display: "flex",
            position: "relative",
            maxWidth: "100%",
            ...infoStyle,
          }}
        >
          <div className={styles["cover-image-container"]}>
            <Image
              width={200}
              height={200}
              src={detail?.playlist.coverImgUrl! + "?param=200y200"}
              alt={detail?.playlist.id.toString() || ""}
            />
            <div className={styles["cover-image-mask"]} />
          </div>
          <div style={{ marginLeft: "36px", flex: 1 }}>
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
                style={{
                  fontSize: "10px",
                  color: "#0c73c2",
                  marginLeft: "8px",
                }}
              >
                {detail?.playlist.creator.nickname}
              </div>
              <div
                style={{ fontSize: "10px", color: "#999", marginLeft: "8px" }}
              >
                {day(detail?.playlist.createTime!).format("YYYY-MM-DD")} ??????
              </div>
            </div>

            <Button
              type={"primary"}
              style={{ position: "absolute", top: "75px", right: "20px" }}
              onClick={() => setOpen(true)}
            >
              <BsFillPinMapFill
                style={{ position: "absolute", left: "12px", top: "7px" }}
              />
              <div style={{ marginLeft: "16px" }}>????????????</div>
            </Button>

            <Modal
              open={open}
              title={"????????????"}
              width={1200}
              onCancel={() => setOpen(false)}
              footer={null}
            >
              <KnowledgeGraph
                basicDistence={80}
                explore={explore}
                node={{
                  id: query.id?.toString() || "",
                  name: detail?.playlist.name || "",
                  type: "??????",
                  hasMore: true,
                  direction: "root",
                }}
                position={{
                  x: 590,
                  y: 270,
                }}
                width={"100%"}
                height={580}
                showFilter={true}
                showNodeMenu={true}
                typeConfig={{
                  ["?????????"]: {
                    radius: 18,
                    typeSize: 8,
                    nameSize: 8,
                    nameColor: "#666",
                    fill: "#89e8e6",
                    hoverStyle: {
                      fill: "#30e4e1",
                    },
                  },
                  ["?????????"]: {
                    radius: 22,
                    fill: "#d389e8",
                    hoverStyle: {
                      fill: "#b130e4",
                    },
                  },
                  ["??????"]: {
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
                <div style={{ marginLeft: "16px" }}>??????</div>
              </Button>
              <Button style={{ marginLeft: "8px" }} disabled>
                <BsCollection
                  style={{ position: "absolute", left: "12px", top: "9px" }}
                />
                <div style={{ marginLeft: "16px" }}>??????</div>
              </Button>
              <Button style={{ marginLeft: "8px" }}>
                <BsShare
                  style={{ position: "absolute", left: "12px", top: "9px" }}
                />
                <div style={{ marginLeft: "16px" }}>??????</div>
              </Button>
              <Button style={{ marginLeft: "8px" }}>
                <BsDownload
                  style={{ position: "absolute", left: "12px", top: "9px" }}
                />
                <div style={{ marginLeft: "16px" }}>??????</div>
              </Button>
              <Button style={{ marginLeft: "8px" }}>
                <BsFillChatLeftTextFill
                  style={{ position: "absolute", left: "12px", top: "9px" }}
                />
                <div style={{ marginLeft: "16px" }}>
                  ?????? {"(" + detail?.playlist.commentCount + ")"}
                </div>
              </Button>
            </div>
            <div
              className={globalStyle["flex-align-center"]}
              style={{ marginTop: "12px" }}
            >
              {detail?.playlist.tags.length !== 0 && <div>?????????</div>}
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
                    <div>??????</div>
                    <BsArrowDown style={{ paddingTop: "3px" }} />
                  </>
                ) : (
                  <>
                    <div>??????</div>
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
            <div style={{ fontSize: "20px" }}>????????????</div>
            <div
              style={{
                margin: "9px 0 0 20px",
                fontSize: "10px",
                color: "#666",
              }}
            >
              {detail?.playlist.trackCount}??????
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "8px",
            }}
          >
            ?????????
            <span
              style={{
                color: "#c20c0c",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              {detail?.playlist.playCount}
            </span>
            ???
          </div>
        </div>
        <Table
          size="small"
          columns={columns}
          dataSource={tracks || []}
          rowKey={(record) => record.id}
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
  } else {
    return <Spin />;
  }
}

export default PlaylistDetail;
