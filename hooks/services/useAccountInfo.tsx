import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWR from "swr";

export const getAccountInfo = async () => {
  const res = await fetch(`${baseUrl}/user/account`, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

function useAccountInfo() {
  const response = useSWR("accountInfo", getAccountInfo);
  return response;
}

export default useAccountInfo;
