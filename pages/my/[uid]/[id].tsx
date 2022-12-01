import { getPlaylistDetail } from "@services/usePlaylistDetail";
import { getPlaylistTracks } from "@services/usePlaylistTracks";
import { Layout } from "antd";
import Content from "components/My/Content";
import Sider from "components/My/Sider";
import { NextPage } from "next";
import React from "react";
import { SWRConfig } from "swr";

const MyPlaylist: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout style={{ height: "100%" }}>
        <Sider />
        <Content />
      </Layout>
    </SWRConfig>
  );
};

MyPlaylist.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  const detail = await getPlaylistDetail({ id: +id });
  const tracks = await getPlaylistTracks({ id: +id, page: 1, pageSize: 20 });
  return {
    fallback: {
      [`/playlist/detail/${id}`]: detail,
      [`/playlist/track/all?id=${id}&limit=20&offset=0`]: tracks,
    },
  };
};

export default MyPlaylist;
