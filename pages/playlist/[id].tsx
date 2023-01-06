import PlaylistDetail from "components/Common/PlaylistDetail";
import React from "react";
import { motion } from "framer-motion";

function Playlist() {
  return (
    <motion.div
      initial={{
        margin: "0px auto",
        background: "#fff",
        width: "fit-content",
        padding: "0px 30px",
        border: "1px solid #d3d3d3",
      }}
    >
      <motion.div
        initial={{
          width: "738px",
        }}
      >
        <PlaylistDetail />
      </motion.div>
    </motion.div>
  );
}

export default Playlist;
