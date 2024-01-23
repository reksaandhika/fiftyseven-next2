import React, { useLayoutEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import audio from "../assets/media/loop.mp3";
import AudioPlayer from "./AudioPlayer";
import Container from "./Container";
import "./MainFooter.scss";
import Panel from "./Panel";

import { motion } from "framer-motion";
import { Durations, Easings } from "../animation";

function MainFooter() {
  const el = useRef();

  const location = useLocation();

  return (
    <Container ref={el} className="MainFooter" size="l">
      <motion.div
        initial="exit"
        animate="enter"
        exit="exit"
        transition={{
          duration: Durations.base / 2
        }}
        variants={{
          enter: {
            y: 0,
            transition: {
              ease: Easings.easeOutCubic
            }
          },
          exit: {
            y: '100%',
            transition: {
              ease: Easings.easeInCubic
            }
          }}
        }
      >
      <Panel>
        <div className="fs desktopOnly">F/S ©{currentYear}</div>
        <div className="text desktopOnly">INTEGRITY THROUGH EXPRESSION™</div>
        <div className="MainFooter__audio-player desktopOnly">
          <AudioPlayer src={audio} />
        </div>
        <div className="mobileFoot mobileOnly">
          INTEGRITY THROUGH EXPRESSION™ ©16/{currentYear.slice(2)}
        </div>
      </Panel>
      </motion.div>
    </Container>
  );
}

export default MainFooter;
