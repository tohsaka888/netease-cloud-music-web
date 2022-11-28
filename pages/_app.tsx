import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { SWRConfig } from "swr";
import { FloatButton, message } from "antd";
import { useRouter } from "next/router";
import Head from "next/head";
import { MusicPlayer } from "netease-music-player";
import LoginModalVisibleProvider from "context/LoginModalVisibleProvider";
import LoginModal from "components/Common/LoginModal";
import QrImageProvider from "context/QrImageProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        onError(err: Error, key, config) {
          message.error(err.name + err.message);
          console.log(config)
          if (!router.pathname.includes("error")) {
            router.push({
              pathname: "/error/" + key,
              query: {
                errName: err.name,
                errMessage: err.message,
              },
            });
          }
        },
      }}
    >
      <Head>
        <title>网易云音乐</title>
      </Head>

      <LoginModalVisibleProvider>
        <QrImageProvider>
          <Component {...pageProps} />
          <LoginModal />
        </QrImageProvider>
      </LoginModalVisibleProvider>

      <FloatButton.BackTop
        style={{
          marginBottom: "32px",
        }}
      />
      <MusicPlayer
        name={"Beautiful World (Da Capo Version)"}
        artist={"宇多田ヒカル"}
        url={"https://music.163.com/song/media/outer/url?id=1824020873.mp3"}
        picUrl={
          "https://p2.music.126.net/l3G4LigZnOxFE9lB4bz_LQ==/109951165791860501.jpg?param=34y34"
        }
        onCollect={() => {
          console.log("collected");
        }}
        onModeChange={(mode) => {
          console.log(mode);
        }}
        onPictureInPicture={() => {
          console.log("pip");
        }}
        onPlayNext={() => {
          console.log("play next");
        }}
        onPlayPrev={() => {
          console.log("play prev");
        }}
        onShare={() => {
          console.log("share");
        }}
        playlistLength={10}
      />
    </SWRConfig>
  );
}
