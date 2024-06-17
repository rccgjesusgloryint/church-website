import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
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
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container w-full">
          {slides.map((link, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <Image
                  src={link}
                  alt={`carousel-img-${index}`}
                  width={800}
                  height={800}
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
