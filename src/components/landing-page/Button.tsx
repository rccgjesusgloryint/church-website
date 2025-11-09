import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const Button = () => {
  const btn = React.useRef<HTMLElement | any>();
  const [disabledBtn, setDisabledBtn] = React.useState(false);

  useGSAP(() => {
    gsap.from(btn.current, {
      y: 150,
      duration: 1.5,
      opacity: 0,
      ease: "back",
    });
  });

  return (
    <Link href={"/about"}>
      <div
        className="btn flex flex-col justify-center items-center cursor-pointer"
        ref={btn}
      >
        <button
          onClick={() => setDisabledBtn(true)}
          disabled={disabledBtn}
          className="flex justify-center items-center bg-primary w-[210px] h-[60px] border-primary hover:bg-transparent hover:border-2 hover:text-primary duration-500 disabled:bg-primary/50 text-primary-foreground"
        >
          LEARN MORE NOW
        </button>
      </div>
    </Link>
  );
};

export default Button;
