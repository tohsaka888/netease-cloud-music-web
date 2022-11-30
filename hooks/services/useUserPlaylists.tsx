import { baseUrl } from "config/baseUrl";
import React, { useMemo, Key } from "react";
import useSWR from "swr";
import { UserPlaylistResponse } from "types";
import useLoginStatus from "./useLoginStatus";

export const getUserPlaylists = async (uid: Key) => {
  const res = await fetch(`${baseUrl}/user/playlist`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid,
    }),
  });
  const data: UserPlaylistResponse = await res.json();
  return data;
};

const useUserPlaylists = () => {
  const { data: loginStatus } = useLoginStatus();
  const uid = useMemo(
    () => loginStatus?.data.profile?.userId || null,
    [loginStatus]
  );

  const response = useSWR(uid ? `/user/playlist/${uid}` : null, () =>
    getUserPlaylists(uid!)
  );

  return response;
};

export default useUserPlaylists;
