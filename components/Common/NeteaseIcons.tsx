import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";

const iconImage =
  "https://s2.music.126.net/style/web2/img/index/index.png?724237747bf71331ed93400836cc97b7";

const iconImageSmall =
  "https://s2.music.126.net/style/web2/img/icon.png?e4400778139cc89f6897237ffc454470";

type IconName = "play" | "collect" | "add" | "play-small" | "collect-small";

type IconPositionProps = Record<
  IconName,
  {
    position: string;
    activePosition: string;
    width: number;
    height: number;
    background: string;
  }
>;

type Props = {
  size?: number;
  name: IconName;
} & HTMLAttributes<HTMLDivElement>;

const iconPosition: IconPositionProps = {
  play: {
    position: "-267px -205px",
    activePosition: "-267px -235px",
    width: 22,
    height: 22,
    background: iconImage,
  },
  collect: {
    position: "-300px -205px",
    activePosition: "-300px -235px",
    width: 22,
    height: 22,
    background: iconImage,
  },
  add: {
    position: "0 -700px",
    activePosition: "-22px -700px",
    width: 17,
    height: 17,
    background: iconImageSmall,
  },
  "play-small": {
    position: "-267px -268px",
    activePosition: "-267px -288px",
    width: 17,
    height: 17,
    background: iconImage,
  },
  "collect-small": {
    position: "-297px -268px",
    activePosition: "-297px -288px",
    width: 17,
    height: 17,
    background: iconImage,
  },
};

function NeteaseIcon({ size = 1, name, ...props }: Props) {
  return (
    <div {...props} style={{ transform: `scale(${size})`, ...props.style }}>
      <motion.div
        initial={{
          background: `url(${iconPosition[name].background}) no-repeat 0 9999px`,
          backgroundPosition: iconPosition[name].position,
          opacity: 0.5,
          width: iconPosition[name].width,
          height: iconPosition[name].height,
        }}
        whileHover={{
          backgroundPosition: iconPosition[name].activePosition,
          opacity: 1,
        }}
        transition={{
          backgroundPosition: {
            duration: 0,
          },
        }}
      />
    </div>
  );
}

export default NeteaseIcon;
