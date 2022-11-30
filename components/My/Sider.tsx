import useLoginStatus from "@services/useLoginStatus";
import useUserPlaylists from "@services/useUserPlaylists";
import { Layout, Menu, MenuProps } from "antd";
import MultipleLines from "components/Common/MultipleLines";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { Playlist } from "types";
import styles from "./index.module.css";

const Sider = () => {
  const { query, push } = useRouter();
  const { data: playlists } = useUserPlaylists();
  const { data: loginStatus } = useLoginStatus();

  const userId = useMemo(
    () => loginStatus?.data.profile?.userId,
    [loginStatus]
  );

  const renderItem = useCallback((playlist: Playlist, collected?: boolean) => {
    return {
      label: (
        <>
          <MultipleLines
            lines={1}
            maxWidth={135}
            style={{
              fontSize: "10px",
              lineHeight: "20px",
            }}
          >
            {playlist.name}
          </MultipleLines>
          <MultipleLines
            lines={1}
            style={{
              color: "#999",
              height: "fit-content",
              fontSize: "10px",
              lineHeight: "20px",
            }}
            maxWidth={135}
          >
            {collected ? (
              <>
                {playlist.trackCount}首 by {playlist.creator.nickname}
              </>
            ) : (
              <>{playlist.trackCount}首</>
            )}
          </MultipleLines>
        </>
      ),
      icon: (
        <Image
          width={40}
          height={40}
          src={playlist.coverImgUrl + "?param=40y40"}
          alt={playlist.coverImgId_str}
        />
      ),
      key: playlist.id,
    };
  }, []);

  const items: MenuProps["items"] = useMemo(() => {
    const created: MenuProps["items"] = playlists?.playlist
      .filter((playlist) => {
        return playlist.creator.userId === userId;
      })
      .map((playlist) => renderItem(playlist));

    const collected = playlists?.playlist
      .filter((playlist) => {
        return playlist.creator.userId !== userId;
      })
      .map((playlist) => renderItem(playlist, true));
    return [
      {
        label: "创建的歌单",
        key: "created",
        children: created,
      },
      {
        label: "收藏的歌单",
        key: "collected",
        children: collected,
      },
    ];
  }, [playlists]);

  return (
    <Layout.Sider className={styles["sider-container"]} width={240}>
      <Menu
        items={items}
        mode={"inline"}
        defaultOpenKeys={["created"]}
        className={"my-music-menu"}
        defaultSelectedKeys={["created", query.id as string]}
        onSelect={(info) => {
          push(`/my/${userId}/${info.key}`);
        }}
      />
    </Layout.Sider>
  );
};

export default Sider;
