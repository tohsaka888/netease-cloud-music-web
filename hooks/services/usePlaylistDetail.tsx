import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWR from "swr";

import { PlaylistDetailResponse } from "types";

type RequestProps = {
  id: number;
  s?: number;
};

export const getPlaylistDetail = async ({ id, s }: RequestProps) => {
  const res = await fetch(`${baseUrl}/playlist/detail?id=${id}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, s }),
  });
  const data: PlaylistDetailResponse = await res.json();
  return data;
};

function usePlaylistDetail({ id, s }: RequestProps) {
  const response = useSWR(
    `/playlist/detail/${id}`,
    async () => await getPlaylistDetail({ id, s })
  );
  return response;
}

export default usePlaylistDetail;
