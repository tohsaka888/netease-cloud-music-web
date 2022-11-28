import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWR from "swr";

type LoginStatusResponse = {
  data: Data;
};

type Data = {
  code: number;
  account: Account;
  profile: null;
};

type Account = {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
};

export const getLoginStatus = async () => {
  const res = await fetch(`${baseUrl}/login/status`, {
    mode: "cors",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   cookie: localStorage.getItem("cookie"),
    // }),
  });
  const data: LoginStatusResponse = await res.json();
  return data;
};

function useLoginStatus() {
  const response = useSWR<LoginStatusResponse>("loginStatus", getLoginStatus);
  return response;
}

export default useLoginStatus;
