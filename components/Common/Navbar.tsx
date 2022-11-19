import React, { CSSProperties, useMemo, useRef } from "react";
import { Button, Input, Layout, Menu } from "antd";
import { useResponsive } from "ahooks";
import style from "./index.module.css";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { ItemType } from "antd/es/menu/hooks/useItems";

const items: ItemType[] = [
  { label: "发现音乐", key: "/" },
  { label: "我的音乐", key: "/my" },
  { label: "关注", key: "/friend" },
  { label: "商城", key: "/shop" },
  { label: "音乐人", key: "/musician" },
  { label: "下载客户端", key: "/download" },
];

const subItems: ItemType[] = [
  { label: "推荐", key: "recommend" },
  { label: "排行榜", key: "toplist" },
  { label: "歌单", key: "playlist" },
  { label: "主播电台", key: "djradio" },
  { label: "歌手", key: "artist" },
  { label: "新碟上架", key: "album" },
];

function Navbar() {
  const responsive = useResponsive();
  const { pathname } = useRouter();

  const isHomePage = useMemo(
    () => (pathname === "/" ? true : false),
    [pathname]
  );

  const styles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {
      container: {
        width: "1100px",
      },
      button: {
        display: "block",
      },
      menu: {
        width: "520px",
        visibility: "visible",
      },
      submenu: {},
    };
    if (responsive) {
      if (responsive.xl) {
        styles.menu = {
          width: "520px",
          visibility: "visible",
        };
      } else if (responsive.lg) {
        styles.container = {
          width: "1000px",
        };
        styles.menu = {
          width: "450px",
        };
      } else if (responsive.md) {
        styles.container = {
          width: "900px",
        };
        styles.menu = {
          width: "250px",
        };
      } else {
        styles.container = {
          width: "100%",
        };
        styles.button.display = "none";
        styles.submenu.display = "none";
        styles.menu = {
          width: "0px",
        };
      }
    }
    return styles;
  }, [responsive]);

  return (
    <>
      <Layout.Header
        className={style.navbar}
        style={{
          borderBottom: "1px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...styles.container,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: `url(https://s2.music.126.net/style/web2/img/frame/topbar.png?c0bd96d28b0d3371d59b049a3bbb020d)`,
                backgroundPosition: "0 0",
                width: "176px",
                minWidth: "176px",
                height: "69px",
              }}
            />
            <Menu
              items={items}
              theme={"dark"}
              defaultSelectedKeys={[isHomePage ? "/" : ""]}
              mode={"horizontal"}
              className={"custom-menu"}
              style={{ position: "relative", ...styles.menu }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              style={{
                width: "158px",
                minWidth: "158px",
                height: "32px",
                borderRadius: "16px",
                fontSize: "12px",
                marginLeft: "16px",
              }}
              prefix={<BsSearch color={"#666666"} />}
              placeholder={"音乐/视频/电台/用户"}
            />
            <Button
              shape="round"
              style={{
                background: "transparent",
                color: "#cecece",
                borderColor: "#666666",
                fontSize: "12px",
                marginLeft: "16px",
                ...styles.button,
              }}
            >
              创作者中心
            </Button>
            <Button
              type={"link"}
              style={{ fontSize: "12px", color: "#666666" }}
            >
              登录
            </Button>
          </div>
        </div>
      </Layout.Header>
      <div
        style={{
          height: "35px",
          background: "#C20C0C",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          items={subItems}
          mode={"horizontal"}
          className={"custom-sub-menu"}
          theme={"dark"}
          defaultSelectedKeys={[isHomePage ? "recommend" : ""]}
          style={{
            marginLeft: `calc((100vw - ${styles.container.width}) / 2 + 192px)`,
            ...styles.submenu,
          }}
        />
      </div>
    </>
  );
}

export default Navbar;
