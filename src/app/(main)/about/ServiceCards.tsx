import React from "react";

import Image from "next/image";

import { CiLogin } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useSession } from "next-auth/react";

type Props = {};

const ServiceCards = (props: Props) => {
  const { status } = useSession();

  const serviceCards = [
    {
      style: "bg-bible-studies",
      category: "Spiritual Growth",
      service: "Bible Studies",
      icon: true,
    },
    {
      style: "bg-sunday-service",
      category: "Fellowship",
      service: "Sunday Service",
      icon: true,
    },
    {
      style: "bg-prayers",
      category: "Spiritual Growth",
      service: "Friday Prayers",
      icon: true,
    },
    {
      style: "bg-evangelism",
      category: "Soul Winning",
      service: "Evangelism",
      icon: false,
    },
  ];
  return (
    <div className="flex flex-row justify-between items-center flex-wrap gap-5 mt-[100px] w-full mb-11 ">
      {serviceCards.map(({ category, icon, service, style }) => (
        <div
          className={`sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 ${style} bg-center bg-cover`}
          key={style}
        >
          <HoverCard>
            {icon && (
              <HoverCardTrigger className="cursor-pointer">
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </HoverCardTrigger>
            )}
            <HoverCardContent>
              {status === "authenticated" ? (
                <div>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_ZOOM_LINK}`}
                    className="flex gap-2 items-center justify-center"
                    target="_blank"
                  >
                    Join Meeting{" "}
                    <span>
                      <GoArrowUpRight />
                    </span>
                  </Link>
                  <p>Zoom Password : 2244</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-xl">Sensitive data! Please log in</p>
                  <Link href="/api/auth/signin">
                    <CiLogin size={35} />
                  </Link>
                </div>
              )}
            </HoverCardContent>
          </HoverCard>
          <div className="backdrop-blur-xl">
            <h3 className="font-bold text-lg">{category}</h3>
            <h1 className="font-bold text-3xl">{service}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
