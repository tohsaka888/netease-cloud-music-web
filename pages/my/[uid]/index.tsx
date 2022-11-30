import { getUserPlaylists } from "@services/useUserPlaylists";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";

const My: NextPage<{ fallback: any }> = ({ fallback }) => {
  const { push, query } = useRouter();
  const uid = query.uid;
  const data = fallback[`/user/playlist/${uid}`];
  useEffect(() => {
    push(`/my/${uid}/${data.playlist[0].id}`);
  }, []);
  return <SWRConfig value={{ fallback }} />;
};

My.getInitialProps = async ({ query }) => {
  const uid = query.uid;
  const data = await getUserPlaylists(uid as string);
  return {
    fallback: {
      [`/user/playlist/${uid}`]: data,
    },
  };
};

export default My;
