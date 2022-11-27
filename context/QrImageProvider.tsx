import useLoginStatus from "@services/useLoginStatus";
import { message } from "antd";
import { baseUrl } from "config/baseUrl";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import {
  useDispatchModalVisible,
  useModalVisible,
} from "./LoginModalVisibleProvider";

type QrKeyResponse = {
  data: Data;
  code: number;
};
type Data = {
  code: number;
  unikey: string;
};

type QrImageResponse = {
  code: number;
  data: ImageData;
};

type ImageData = {
  qrurl: string;
  qrimg: string;
};

type CheckResponse = {
  code: number;
  cookie: string;
  message: string;
};

type Props = {
  children: React.ReactNode;
};

const Context = createContext<{ qrImg: string; status: number }>({
  qrImg: "",
  status: -1,
});

function useQrCode({ children }: Props) {
  const { data: loginStatus, mutate } = useLoginStatus();
  const [qrImg, setQrImg] = useState<string>("");
  const visible = useModalVisible();
  const [qrKey, setQrKey] = useState<string | null>(null);
  const [status, setStatus] = useState<number>(-1);
  const setModalVisible = useDispatchModalVisible();

  /**
   * fetch qr key
   * can not use swr to cache the result
   * @date 11/27/2022 - 12:43:03 PM
   *
   * @type {*}
   */
  const fetchQrKey = useCallback(async (signal: AbortSignal) => {
    if (!loginStatus?.data.profile) {
      const timestamp = new Date().getTime();
      try {
        const res = await fetch(
          `${baseUrl}/login/qr/key?timestamp=${timestamp}`,
          {
            mode: "cors",
            signal,
          }
        );
        const data: QrKeyResponse = await res.json();
        setQrKey(data.data.unikey);
        fetchQrImage(data.data.unikey);
      } catch (error) {
        message.error((error as Error).message);
      }
    }
  }, []);

  /**
   * fetch qr image
   * @date 11/27/2022 - 3:18:56 PM
   *
   * @type {*}
   */
  const fetchQrImage = useCallback(async (key: string) => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(
        `${baseUrl}/login/qr/create?timestamp=${timestamp}`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key, qrimg: true }),
        }
      );
      const data: QrImageResponse = await res.json();
      setQrImg(data.data.qrimg);
    } catch (error) {
      message.error((error as Error).message);
    }
  }, []);

  // check
  useSWR<CheckResponse>(
    qrKey,
    async (key) => {
      const timestamp = new Date().getTime();
      const res = await fetch(
        `${baseUrl}/login/qr/check?timestamp=${timestamp}`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key }),
        }
      );
      const data = await res.json();
      return data;
    },
    {
      onSuccess(data, key, config) {
        setStatus(data.code);
        if (data.code === 800 || data.code === 803) {
          setQrKey(null);
          if (data.code === 803) {
            document.cookie = data.cookie;
            localStorage.setItem("cookie", data.cookie);
            mutate();
            setModalVisible(false);
            message.success(data.message);
          }
        }
      },
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (visible) {
      fetchQrKey(signal);
    } else {
      controller.abort();
    }
  }, [visible]);

  return (
    <Context.Provider value={{ qrImg, status }}>{children}</Context.Provider>
  );
}

export function useQrImage() {
  const qrImg = useContext(Context)!;
  return qrImg;
}

export default useQrCode;
