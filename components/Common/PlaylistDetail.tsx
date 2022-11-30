import usePlaylistDetail from "@services/usePlaylistDetail";
import { Avatar, Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import globalStyle from "styles/global.module.css";
import styles from "./index.module.css";
import day from "dayjs";
import {
  BsCollection,
  BsDownload,
  BsFillChatLeftTextFill,
  BsPlayCircle,
  BsShare,
} from "react-icons/bs";

function PlaylistDetail() {
  const { query } = useRouter();
  const { data: detail } = usePlaylistDetail({ id: +(query.id as string) });
  return (
    <>
      <div
        className={globalStyle["flex-align-center"]}
        style={{ padding: "40px" }}
      >
        <div className={styles["cover-image-container"]}>
          <Image
            width={200}
            height={200}
            src={detail?.playlist.coverImgUrl!}
            alt={detail?.playlist.coverImgId_str! + "?param=200y200"}
          />
          <div className={styles["cover-image-mask"]} />
        </div>
        <div style={{ height: "200px", marginLeft: "36px" }}>
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

          <div
            style={{ marginTop: "8px" }}
            className={globalStyle["flex-align-center"]}
          >
            <Button type={"primary"} style={{ position: "relative" }}>
              <BsPlayCircle
                style={{ position: "absolute", left: "12px", top: "9px" }}
              />
              <div style={{ marginLeft: "16px" }}>播放</div>
              {/* <BsPlus
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "6px",
                  fontSize: "20px",
                }}
              /> */}
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
        </div>
      </div>
    </>
  );
}

export default PlaylistDetail;
