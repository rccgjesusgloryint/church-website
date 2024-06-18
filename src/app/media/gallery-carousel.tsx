import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../../../components/global/custom-modal";
import { GetAllImages } from "@/lib/types";

type PropType = {
  slides: GetAllImages | undefined;
  options?: EmblaOptionsType;
  name: string | undefined;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, name } = props;
  const { setOpen } = useModal();
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="embla">
      <div>
        <h1>{name && name}</h1>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container w-full">
          {slides &&
            slides.map((link, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <Image
                    src={link.link}
                    alt={`carousel-img-${index}`}
                    width={800}
                    height={800}
                    onClick={() =>
                      setOpen(
                        <CustomModal
                          title={link.name}
                          // subheading="Praise and Worship"
                        >
                          <Image
                            src={link.link}
                            alt="fullImage"
                            width={1000}
                            height={1000}
                          />
                        </CustomModal>
                      )
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="embla__controls">
        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
