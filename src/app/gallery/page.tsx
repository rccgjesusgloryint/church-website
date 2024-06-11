"use client";

import React from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";
import Card from "@/components/custom/Card";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import Navbar2 from "../../../components/Navbar2";

const Gallery = () => {
  const images = [
    "/images/carousel_img1.jpg",
    "/images/carousel_img2.jpg",
    "/images/carousel_img3.jpg",
    "/images/carousel_img4.jpg",
    "/images/carousel_img5.jpg",
    "/images/carousel_img6.jpg",
  ];
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = React.useState(FAST_DURATION);
  let [ref1, { width: width1 }] = useMeasure();
  let [ref2, { width: width2 }] = useMeasure();

  const xTranslation1 = useMotionValue(0);
  const xTranslation2 = useMotionValue(0);

  const [mustFinish1, setMustFinish1] = useState(false);
  const [mustFinish2, setMustFinish2] = useState(false);
  const [rerender, setRerender] = useState(false);

  React.useEffect(() => {
    let controls1;
    let controls2;
    let finalPosition1 = -width1 / 2 - 8; // Adjust as needed for spacing
    let finalPosition2 = finalPosition1; // Start second row at the same distance as the first row ends

    if (mustFinish1) {
      controls1 = animate(
        xTranslation1,
        [xTranslation1.get(), finalPosition1],
        {
          ease: "linear",
          duration: duration * (1 - xTranslation1.get() / finalPosition1),
          onComplete: () => {
            setMustFinish1(false);
            setRerender(!rerender);
          },
        }
      );
    } else {
      controls1 = animate(xTranslation1, [0, finalPosition1], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    if (mustFinish2) {
      controls2 = animate(
        xTranslation2,
        [xTranslation2.get(), finalPosition2],
        {
          ease: "linear",
          duration: duration * (1 - xTranslation2.get() / finalPosition2),
          onComplete: () => {
            setMustFinish2(false);
            setRerender(!rerender);
          },
        }
      );
    } else {
      controls2 = animate(xTranslation2, [finalPosition1, 0], {
        // Move second row from final position of the first row
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => {
      controls1?.stop();
      controls2?.stop();
    };
  }, [rerender, xTranslation1, xTranslation2, duration, width1, width2]);

  return (
    <>
      <Navbar2 />
      <main className="py-8 flex flex-col gap-11">
        <h1 className="text-black text-4xl text-center">Gallery</h1>
        <motion.div
          className="flex gap-4"
          style={{ x: xTranslation1 }}
          ref={ref1}
          onHoverStart={() => {
            setMustFinish1(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish1(true);
            setDuration(FAST_DURATION);
          }}
        >
          {[...images, ...images].map((item, idx) => (
            <Card image={`${item}`} key={idx} />
          ))}
        </motion.div>
        <motion.div
          className="flex gap-4"
          style={{ x: xTranslation2 }}
          ref={ref2}
          onHoverStart={() => {
            setMustFinish2(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish2(true);
            setDuration(FAST_DURATION);
          }}
        >
          {[...images, ...images].map((item, idx) => (
            <Card image={`${item}`} key={idx} />
          ))}
        </motion.div>
      </main>
      <Newsletter />
      {/* <Footer /> */}
    </>
  );
};

export default Gallery;
