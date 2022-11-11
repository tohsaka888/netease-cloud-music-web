import React, { HTMLAttributes } from "react";
import styles from "./index.module.css";

type Props = {
  children: string;
  lines?: number;
  maxWidth: string | number;
} & HTMLAttributes<HTMLDivElement>;

function MultipleLines({ children, lines = 2, maxWidth, ...props }: Props) {
  return (
    <div
      className={styles["multiple-lines"]}
      {...props}
      style={{ WebkitLineClamp: lines, maxWidth, ...props.style }}
    >
      {children}
    </div>
  );
}

export default MultipleLines;
