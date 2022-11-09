import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { SWRConfig } from "swr";
import { message } from "antd";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        onError(err: Error, key, config) {
          message.error(err.name + err.message);
          if (!router.pathname.includes("error")) {
            router.push("/error");
          }
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
