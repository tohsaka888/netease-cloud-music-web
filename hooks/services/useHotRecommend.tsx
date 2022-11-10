import React from "react";
import { baseUrl } from "config/baseUrl";
import useSWRImmutable from "swr/immutable";
import { HotRecommendResponse } from "types";

export const url = `${baseUrl}/personalized?limit=8`;

export const getHotRecommend = async () => {
  const res = await fetch(url, {
    mode: "cors",
  });
  const data: HotRecommendResponse = await res.json();
  return data;
};

function useHotRecommend() {
  const response = useSWRImmutable(url, getHotRecommend);
  return { ...response };
}

export default useHotRecommend;
