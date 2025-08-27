import React from "react";

import Image from "next/image";

import { CiLogin } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ServiceCards = {
  style: string;
  category: string;
  service: string;
  icon: boolean;
}[];

type Props = {
  serviceCards: ServiceCards;
  status: any;
};

const MobileViewServiceCards = ({ serviceCards, status }: Props) => {
  return (
    <>
      {serviceCards.map(({ category, icon, service, style }) => (
        <div
          className={`sm:w-[331px] w-full h-[460px] bg-slate-400 flex flex-col justify-end items-start pb-14 pl-10 gap-1 ${style} bg-center bg-cover`}
          key={style}
        >
          <Dialog>
            {icon && (
              <DialogTrigger className="cursor-pointer">
                <Image
                  src="/images/Zoom.png"
                  alt="location"
                  width={40}
                  height={40}
                />
              </DialogTrigger>
            )}
            <DialogContent>
              <Card>
                {status === "authenticated" ? (
                  <CardContent>
                    <DialogTitle>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_ZOOM_LINK}`}
                        className="flex gap-2 items-center justify-center mb-5"
                        target="_blank"
                      >
                        Join Meeting{" "}
                        <span>
                          <GoArrowUpRight />
                        </span>
                      </Link>
                      <p>Zoom Password : 2244</p>
                    </DialogTitle>
                  </CardContent>
                ) : (
                  <CardContent>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <p className="text-xl">Sensitive data! Please log in</p>
                      <Link href="/api/auth/signin">
                        <CiLogin size={35} />
                      </Link>
                    </div>
                  </CardContent>
                )}
              </Card>
              <DialogDescription></DialogDescription>
            </DialogContent>
          </Dialog>
          <div className="backdrop-blur-xl">
            <h3 className="font-bold text-lg">{category}</h3>
            <h1 className="font-bold text-3xl">{service}</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default MobileViewServiceCards;
