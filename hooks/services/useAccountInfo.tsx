import { baseUrl } from "config/baseUrl";
import React, { Key } from "react";
import useSWR from "swr";
import { AccountInfoResponse } from "types";
import useLoginStatus from "./useLoginStatus";

export const getAccountInfo = async (uid: Key) => {
  const timestamp = new Date().getTime();
  const res = await fetch(`${baseUrl}/user/detail?timestamp=${timestamp}`, {
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ uid }),
  });
  if (res.ok) {
    const data: AccountInfoResponse = await res.json();
    return data;
  } else {
    throw new Error(
      JSON.stringify({
        statusCode: res.status,
        title: res.statusText,
        message: "can not fetch account info",
      })
    );
  }
};

function useAccountInfo() {
  const { data: loginStatus } = useLoginStatus();
  const uid = loginStatus?.data.profile?.userId;
  const response = useSWR(uid ? "accountInfo" : null, () => {
    return getAccountInfo(uid!);
  });
  return response;
}

export default useAccountInfo;
