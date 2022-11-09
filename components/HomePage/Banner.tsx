import useBanner from "@services/useBanner";
import { Carousel } from "antd";
import React, { useRef } from "react";
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

  const imageSize = useMemo(() => {
    if (responsive) {
      if (responsive.xl) {
        return { width: 730, height: 730 * 0.38 };
      } else if (responsive.lg) {
        return { width: 680, height: 680 * 0.38 };
      } else {
        return { width: 630, height: 630 * 0.38 };
      }
    } else {
      return { width: 730, height: 730 * 0.38 };
    }
  }, [responsive]);

  return (
    <div
      style={{ width: "100vw", height: imageSize.height, position: "relative" }}
    >
      <div
        style={{
          width: "64vw",
          position: "relative",
          margin: "0px 18vw",
          overflow: "hidden",
        }}
      >
        <Carousel
          style={{ ...imageSize }}
          autoplay
          autoplaySpeed={3000}
          effect={"fade"}
          ref={carouselRef}
        >
          {banners.map((banner) => (
            <React.Fragment key={banner.targetId}>
              <div style={{ height: "300px", width: "50vw" }}>
                <Image
                  src={banner.imageUrl}
                  alt={banner.imageUrl}
                  priority
                  width={imageSize.width}
                  height={imageSize.height}
                />
              </div>
            </React.Fragment>
          ))}
        </Carousel>
        <div
          style={{
            position: "absolute",
            height: imageSize.height,
            right: "0px",
            background:
              "url(https://s2.music.126.net/style/web2/img/index/download.png?5a1a8555a5ed4cc3f268392ace664ea8) no-repeat 0 0",
            top: "0px",
            width: `calc(100% - ${imageSize.width}px)`,
            boxShadow: "0px 0px 20px 3px #333333",
          }}
        />
      </div>
      <motion.div
        initial={{
          position: "absolute",
          top: "calc(50% - 24px)",
          left: "calc(9vw - 24px)",
          cursor: "pointer",
        }}
        whileHover={{
          opacity: 0.5,
        }}
        onClick={() => carouselRef.current.prev()}
      >
        <BsArrowLeftShort size={56} />
      </motion.div>
      <motion.div
        initial={{
          position: "absolute",
          top: "calc(50% - 24px)",
          right: "calc(9vw - 24px)",
          cursor: "pointer",
        }}
        whileHover={{
          opacity: 0.5,
        }}
        onClick={() => carouselRef.current.next()}
      >
        <BsArrowRightShort size={56} />
      </motion.div>
    </div>
  );
}

export default Banner;
