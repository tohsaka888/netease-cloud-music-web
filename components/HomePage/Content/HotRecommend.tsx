import useHotRecommend from "@services/useHotRecommend";
import React, { useMemo } from "react";
import PartTitle from "./PartTitle";
import globalStyles from "styles/global.module.css";
import Playlist from "components/Common/Playlist";

function HotRecommend() {
  const { data } = useHotRecommend();
  const results = useMemo(() => data?.result || [], [data]);
  return (
    <>
      <PartTitle>热门推荐</PartTitle>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "24px",
          maxHeight: "380px",
          overflow: "hidden",
        }}
      >
        {results.map((result) => (
          <Playlist
            key={result.id}
            id={result.id}
            picUrl={result.picUrl}
            playcount={result.playCount}
            name={result.name}
          />
        ))}
      </div>
    </>
  );
}

export default HotRecommend;
