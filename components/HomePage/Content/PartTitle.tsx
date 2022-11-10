import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import globalStyles from "styles/global.module.css";
import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  extra?: React.ReactNode;
};

function PartTitle({ children, extra }: Props) {
  return (
    <div
      className={`${globalStyles["flex-align-center"]} `}
      style={{
        background: `url(https://s2.music.126.net/style/web2/img/index/index.png?724237747bf71331ed93400836cc97b7) no-repeat 0 9999px`,
        backgroundPosition: "-225px -156px",
        borderBottom: "2px solid #C10D0C",
        padding: "0px 10px 0px 34px",
        height: "33px",
        width: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div style={{ fontSize: "20px" }}>{children}</div>
      <div className={globalStyles["flex-align-center"]}>
        <div>更多</div>
        <BsArrowRightShort
          color={"#C10D0C"}
          size={20}
          style={{ marginTop: "2px" }}
        />
      </div>
      {extra}
    </div>
  );
}

export default PartTitle;
