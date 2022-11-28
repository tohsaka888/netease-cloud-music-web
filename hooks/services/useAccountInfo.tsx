import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWR from "swr";

export const getAccountInfo = async () => {
  const timestamp = new Date().getTime();
  const res = await fetch(`${baseUrl}/user/account?timestamp=${timestamp}`, {
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ cookie: localStorage.getItem("cookie") }),
  });
  const data = await res.json();
  return data;
};

function useAccountInfo() {
  const response = useSWR("accountInfo", getAccountInfo);
  return response;
}

export default useAccountInfo;
