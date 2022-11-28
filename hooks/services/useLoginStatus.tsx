import { baseUrl } from "config/baseUrl";
import React from "react";
import useSWR from "swr";

type LoginStatusResponse = {
  data: Data;
};

type Data = {
  code: number;
  account: Account;
  profile: Profile;
};

type Profile = {
  userId: number;
  userType: number;
  nickname: string;
  avatarImgId: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  signature: string;
  createTime: number;
  userName: string;
  accountType: number;
  shortUserName: string;
  birthday: number;
  authority: number;
  gender: number;
  accountStatus: number;
  province: number;
  city: number;
  authStatus: number;
  description: null;
  detailDescription: null;
  defaultAvatar: boolean;
  expertTags: null;
  experts: null;
  djStatus: number;
  locationStatus: number;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  authenticated: boolean;
  lastLoginTime: number;
  lastLoginIP: string;
  remarkName: null;
  viptypeVersion: number;
  authenticationTypes: number;
  avatarDetail: null;
  anchor: boolean;
} | null;

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
  const timestamp = new Date().getTime();
  const res = await fetch(`${baseUrl}/login/status?timestamp=${timestamp}`, {
    mode: "cors",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookie: localStorage.getItem("cookie"),
    }),
  });
  const data: LoginStatusResponse = await res.json();
  return data;
};

function useLoginStatus() {
  const response = useSWR<LoginStatusResponse>("loginStatus", getLoginStatus);
  return response;
}

export default useLoginStatus;
