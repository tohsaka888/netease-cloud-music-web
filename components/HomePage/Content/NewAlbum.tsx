import useNewAlbum from "@services/useNewAlbum";
import { Carousel } from "antd";
import Image from "next/image";
import React, { useMemo, useRef } from "react";
import PartTitle from "./PartTitle";
import styles from "../index.module.css";
import MultipleLines from "components/Common/MultipleLines";
import { CarouselRef } from "antd/es/carousel";

function NewAlbum() {
  const { data } = useNewAlbum();
  const albums = useMemo(() => data?.albums || [], [data]);
  const carouselRef = useRef<CarouselRef>(null!);
  return (
    <>
      <PartTitle>新碟上架</PartTitle>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        <Carousel
          ref={carouselRef}
          autoplay={false}
          arrows={true}
          variableWidth
          dots={false}
          draggable
          slidesToScroll={5}
          style={{
            width: "100%",
            height: "184px",
            background: "#f5f5f5",
            marginTop: "16px",
            border: "1px solid #d3d3d3",
            padding: "0px 16px",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {albums.map((album) => (
            <div
              className={styles["album-container"]}
              key={album.id.toString()}
            >
              <Image
                src={album.picUrl}
                alt={album.id.toString()}
                width={100}
                height={100}
                priority
              />
              <div className={styles["album-mask"]} />
              <MultipleLines
                lines={1}
                maxWidth={"105px"}
                style={{
                  fontSize: "12px",
                  marginTop: "3px",
                  lineHeight: "18px",
                  color: "#000",
                }}
              >
                {album.name}
              </MultipleLines>
              <MultipleLines
                lines={1}
                maxWidth={"110px"}
                style={{
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#666",
                }}
              >
                {album.artists.map((artist) => artist.name).join("/")}
              </MultipleLines>
            </div>
          ))}
        </Carousel>
        <div
          className={styles["album-left-arrow"]}
          onClick={() => carouselRef.current.prev()}
        />
        <div
          className={styles["album-right-arrow"]}
          onClick={() => carouselRef.current.next()}
        />
      </div>
    </>
  );
}

export default NewAlbum;
