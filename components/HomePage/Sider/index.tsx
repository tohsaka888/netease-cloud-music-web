import { Layout } from "antd";
import useHomePageStyles from "hooks/styles/useHomePageStyles";
import React from "react";
import Artists from "./Artists";
import HotDj from "./HotDj";
import SuggestLogin from "./SuggestLogin";

function Sider() {
  const { imageStyle, downloadStyle } = useHomePageStyles();
  return (
    <Layout.Sider
      style={{
        marginRight: `calc((100% - ${imageStyle.width} - ${downloadStyle.width}) / 2)`,
        border: "1px solid #d3d3d3",
        ...downloadStyle,
      }}
      width={downloadStyle.width}
      theme={"light"}
    >
      <SuggestLogin />
      <Artists />
      <HotDj />
    </Layout.Sider>
  );
}

export default Sider;
