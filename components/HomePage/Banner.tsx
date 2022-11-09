import useBanner from "@services/useBanner";
import { Carousel } from "antd";
import React, { CSSProperties, useRef, useState } from "react";
import { useMemo } from "react";
import Image from "next/image";
import { useResponsive } from "ahooks";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { motion } from "framer-motion";
import { CarouselRef } from "antd/lib/carousel";

function Banner() {
  const { data } = useBanner();
  const banners = useMemo(() => data?.banners || [], [data]);
  const responsive = useResponsive();
  const carouselRef = useRef<CarouselRef>(null!);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // responsive styles
  const styles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {
      imageStyle: {
        width: "730px",
        height: `${730 * 0.38}px`,
      },
      downloadStyle: {
        display: "block",
        width: "253px",
      },
      arrowStyle: {
        opacity: 1,
      },
    };
    if (responsive) {
      if (responsive.xl) {
        styles.imageStyle.width = "730px";
      } else if (responsive.lg) {
        styles.imageStyle.width = "600px";
      } else if (responsive.md) {
        styles.imageStyle.width = "680px";
        styles.downloadStyle = {
          display: "none",
          width: "0px",
        };
      } else {
        styles.imageStyle.width = "500px";
        styles.arrowStyle.opacity = 0;
        styles.downloadStyle = {
          display: "none",
          width: "0px",
        };
      }
    }
    return styles;
  }, [responsive]);

  return (
    <motion.div
      initial={{
        width: "100vw",
        height: styles.imageStyle.height,
        position: "relative",
        background: `url(${
          banners[currentIndex].imageUrl + "?imageView&blur=40x20"
        })`,
        backgroundSize: "6000px",
        backgroundPosition: "center center",
      }}
      animate={{
        background: `url(${
          banners[currentIndex].imageUrl + "?imageView&blur=40x20"
        })`,
      }}
    >
      <div
        style={{
          width: "100vw",
          position: "relative",
          padding: `0px calc((100vw - ${styles.imageStyle.width} - ${styles.downloadStyle.width})/ 2)`,
          overflow: "hidden",
        }}
      >
        <Carousel
          style={{
            boxShadow: "0px 0px 50px 3px #333333",
            ...styles.imageStyle,
          }}
          autoplay
          autoplaySpeed={3000}
          effect={"fade"}
          ref={carouselRef}
          beforeChange={(current, next) => {
            setCurrentIndex(next);
          }}
        >
          {banners.map((banner) => (
            <Image
              key={banner.targetId}
              src={banner.imageUrl}
              alt={banner.imageUrl}
              priority
              width={parseInt(styles.imageStyle.width as string)}
              height={parseInt(styles.imageStyle.height as string)}
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
            left: `calc((100vw - ${styles.imageStyle.width} - ${styles.downloadStyle.width})/ 2 + ${styles.imageStyle.width})`,
            background:
              "url(https://s2.music.126.net/style/web2/img/index/download.png?5a1a8555a5ed4cc3f268392ace664ea8) no-repeat 0 0",
            top: "0px",
            boxShadow: "0px 0px 50px 3px #333333",
            zIndex: 10,
            opacity: 1,
            ...styles.downloadStyle,
          }}
        />
      </div>
      <motion.div
        initial={{
          position: "absolute",
          top: "calc(50% - 24px)",
          cursor: "pointer",
          left: `calc((100vw - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
        }}
        animate={{
          left: `calc((100vw - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
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
          right: `calc((100vw - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
        }}
        animate={{
          right: `calc((100vw - ${styles.imageStyle.width} - ${styles.downloadStyle.width}) / 4)`,
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
