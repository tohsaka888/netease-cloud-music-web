import React, { useMemo } from "react";
import { useResponsive } from "ahooks";

function useResponseValue() {
  const responsive = useResponsive();

  const value = useMemo(() => {
    if (responsive) {
      if (responsive.xl) {
        return "xl";
      } else if (responsive.lg) {
        return "lg";
      } else if (responsive.md) {
        return "md";
      } else if (responsive.sm) {
        return "sm";
      } else {
        return "xs";
      }
    } else {
      return "xl";
    }
  }, [responsive]);

  return value;
}

export default useResponseValue;
