import { useResponsive } from "ahooks";
import { Layout } from "antd";
import useHomePageStyles from "hooks/styles/useHomePageStyles";
import React from "react";
import HotRecommend from "./HotRecommend";
import NewAlbum from "./NewAlbum";

function Content() {
  const { imageStyle, downloadStyle } = useHomePageStyles();
  return (
    <Layout.Content
      style={{
        margin: `0px calc((100% - ${imageStyle.width} - ${downloadStyle.width}) / 2)`,
        padding: "16px 20px",
        background: "#fff",
        width: imageStyle.width,
        border: "1px solid #d3d3d3",
      }}
    >
      <HotRecommend />
      <NewAlbum />
    </Layout.Content>
  );
}

export default Content;
