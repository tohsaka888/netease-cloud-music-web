import useResponseValue from "hooks/useResponseValue";
import React, { CSSProperties } from "react";

const initStyle: Record<string, CSSProperties> = {
  imageStyle: {
    width: "730px",
    height: "280px",
  },
  downloadStyle: {
    display: "flex",
    width: "253px",
  },
  arrowStyle: {
    opacity: 1,
  },
};

const styles: Record<
  "xl" | "lg" | "md" | "sm" | "xs",
  Record<string, CSSProperties>
> = {
  xl: initStyle,
  lg: {
    ...initStyle,
    imageStyle: {
      ...initStyle.imageStyle,
      width: "600px",
    },
  },
  md: {
    ...initStyle,
    imageStyle: {
      ...initStyle.imageStyle,
      width: "680px",
    },
    downloadStyle: {
      display: "none",
      width: "0px",
    },
  },
  sm: {
    ...initStyle,
    imageStyle: {
      ...initStyle.imageStyle,
      width: "500px",
    },
    arrowStyle: {
      opacity: 0,
    },
    downloadStyle: {
      display: "none",
      width: "0px",
    },
  },
  xs: {
    ...initStyle,
    imageStyle: {
      ...initStyle.imageStyle,
      width: "500px",
    },
    arrowStyle: {
      opacity: 0,
    },
    downloadStyle: {
      display: "none",
      width: "0px",
    },
  },
};

function useHomePageStyles() {
  const val = useResponseValue();
  return styles[val];
}

export default useHomePageStyles;
