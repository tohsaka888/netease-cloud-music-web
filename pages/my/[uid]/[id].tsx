import { getPlaylistDetail } from "@services/usePlaylistDetail";
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
  const data = await getPlaylistDetail({ id: +id });
  return {
    fallback: {
      [`/playlist/detail/${id}`]: data,
    },
  };
};

export default MyPlaylist;
