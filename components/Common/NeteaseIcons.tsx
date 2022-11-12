import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";

const iconImage =
  "https://s2.music.126.net/style/web2/img/index/index.png?724237747bf71331ed93400836cc97b7";

type IconName = "play" | "collect";

type IconPositionProps = Record<
  IconName,
  {
    position: string;
    activePosition: string;
  }
>;

type Props = {
  width: number;
  height: number;
  name: IconName;
} & HTMLAttributes<HTMLDivElement>;

const iconPosition: IconPositionProps = {
  play: {
    position: "-267px -205px",
    activePosition: "-267px -235px",
  },
  collect: {
    position: "-300px -205px",
    activePosition: "-300px -235px",
  },
};

function NeteaseIcon({ width, height, name, ...props }: Props) {
  return (
    <div {...props}>
      <motion.div
        initial={{
          background: `url(${iconImage}) no-repeat 0 9999px`,
          backgroundPosition: iconPosition[name].position,
          width,
          height,
          opacity: 1,
        }}
        whileHover={{
          backgroundPosition: iconPosition[name].activePosition,
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
