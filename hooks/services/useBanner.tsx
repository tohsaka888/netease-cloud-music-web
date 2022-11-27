import React from "react";
import { baseUrl } from "config/baseUrl";
import useImmutableSWR from "swr/immutable";
import { BannerResponseProps } from "types";

export const url = `${baseUrl}/banner?type=0`;

export const getBanner = async () => {
  const res = await fetch(url, {
    mode: "cors",
  });
  const data: BannerResponseProps = await res.json();
  return data;
};

function useBanner() {
  const response = useImmutableSWR(url, getBanner);
  return { ...response };
}

export default useBanner;
