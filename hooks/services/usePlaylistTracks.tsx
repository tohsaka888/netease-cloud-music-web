import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWR from "swr";
import { Track } from "types";

type RequestProps = {
  id: number;
  page: number;
  pageSize: number;
};

export const getPlaylistTracks = async ({
  id,
  page,
  pageSize,
}: RequestProps) => {
  const timestamp = new Date().getTime();
  const res = await fetch(
    `${baseUrl}/playlist/track/all?timestamp=${timestamp}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),
    }
  );
  const data = await res.json();
  return data.songs;
};

function usePlaylistTracks(props: RequestProps) {
  const response = useSWR<Track[]>(
    `/playlist/track/all?id=${props.id}&limit=${props.pageSize}&offset=${
      (props.page - 1) * props.pageSize
    }`,
    () => getPlaylistTracks(props)
  );
  return response;
}

export default usePlaylistTracks;
