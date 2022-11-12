import useBanner from "@services/useBanner";
import { Carousel } from "antd";
import React, { useRef, useState } from "react";
import { useMemo } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { motion, TargetAndTransition } from "framer-motion";
import { CarouselRef } from "antd/lib/carousel";
import useHomePageStyles from "hooks/styles/useHomePageStyles";

function Banner() {
  const { data } = useBanner();
  const banners = useMemo(() => data?.banners || [], [data]);
  const carouselRef = useRef<CarouselRef>(null!);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const styles = useHomePageStyles();

  return (
    <motion.div
      initial={{
        width: "100%",
        position: "relative",
        background: `url(${
          banners[currentIndex].imageUrl + "?imageView&blur=40x20"
        })`,
        backgroundSize: "6000px",
        backgroundPosition: "center center",
        height: styles.imageStyle.height,
      }}
      animate={{
        background: `url(${
          banners[currentIndex].imageUrl + "?imageView&blur=40x20"
        })`,
        height: styles.imageStyle.height,
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          padding: `0px calc((100% - ${styles.imageStyle.width} - ${styles.downloadStyle.width})/ 2)`,
          overflow: "hidden",
        }}
      >
        <Carousel
          style={{
            boxShadow: "0px 0px 50px 3px #333333",
            ...styles.imageStyle,
          }}
          autoplay
          autoplaySpeed={5000}
          effect={"fade"}
          easing={"easeInOutExpo"}
          ref={carouselRef}
          beforeChange={(current, next) => {
            setCurrentIndex(next);
          }}
        >
          {banners.map((banner) => (
            <motion.img
              key={banner.targetId}
              src={banner.imageUrl}
              alt={banner.imageUrl}
              initial={{
                ...(styles.imageStyle as any),
              }}
              animate={{
                ...(styles.imageStyle as TargetAndTransition),
              }}
              style={{
                boxShadow: "0px 0px 50px 3px #333333",
              }}
            />
          ))}
        </Carousel>
        <div
          style={{
            position: "absolute",
            height: styles.imageStyle.height,
            left: `calc((100% - ${styles.imageStyle.width} - ${styles.downloadStyle.width})/ 2 + ${styles.imageStyle.width})`,
            background:
              "url(https://s2.music.126.net/style/web2/img/index/download.png?5a1a8555a5ed4cc3f268392ace664ea8) no-repeat 0 0",
            top: "0px",
            boxShadow: "0px 0px 50px 3px #333333",
            zIndex: 10,
            opacity: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            ...styles.downloadStyle,
          }}
        >
          <span
            style={{ fontSize: "12px", color: "#8d8d8d", marginBottom: "8px" }}
          >
            PC 安卓 iPhone WP iPad Mac 六大客户端
          </span>
        </div>
      </div>
      <motion.div
        initial={{
          position: "absolute",
          top: "calc(50% - 24px)",
          cursor: "pointer",
          left: `calc((100% - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
        }}
        animate={{
          left: `calc((100% - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
          opacity: styles.arrowStyle.opacity,
        }}
        whileHover={{
          opacity: 0.5,
        }}
        onClick={() => carouselRef.current.prev()}
      >
        <BsArrowLeftShort size={56} color={"#dfdfdf"} />
      </motion.div>
      <motion.div
        initial={{
          position: "absolute",
          top: "calc(50% - 24px)",
          cursor: "pointer",
          right: `calc((100% - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
        }}
        animate={{
          right: `calc((100% - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
          opacity: styles.arrowStyle.opacity,
        }}
        whileHover={{
          opacity: 0.5,
        }}
        onClick={() => carouselRef.current.next()}
      >
        <BsArrowRightShort size={56} color={"#dfdfdf"} />
      </motion.div>
    </motion.div>
  );
}

export default Banner;
