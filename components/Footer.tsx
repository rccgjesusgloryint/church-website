import React from "react";

import { IoMapOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="h-auto w-full bg-med-gr pt-5">
      <div className="h-full w-full">
        <div className="grid-cols-12 grid h-full gap-5">
          <div className="sm:col-start-3 col-start-3 sm:col-span-3 col-span-8 w-full h-full flex flex-col items-center justify-center flex-wrap">
            <div className="flex flex-col justify-center items-start text-white text-le">
              <h1 className="mb-6 cursor-pointer">
                <Link href="/home">
                  <Image
                    src="/images/Church-logo.jpg"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Link>
              </h1>
              <p className="mb-5">
                Everything was seamless. The private guides were interesting
              </p>
              <div className="flex flex-row items-start justify-start mb-8 gap-[13px]">
                <IoMapOutline color="black" size={20} />
                <p>Grand Conference Hall - 881 7th Ave New York, NY</p>
              </div>
              <div className="flex flex-row mb-8 gap-[10px] cursor-pointer">
                <FaPhoneAlt color="black" size={20} />
                <p>+ 1805 73 78 00</p>
              </div>
              <div className="flex flex-row mb-8 gap-[13px] cursor-pointer">
                <IoMailOutline color="black" size={20} />
                <p>info@lifes.com</p>
              </div>
            </div>
          </div>
          <div className="sm:col-start-6 col-start-3 sm:col-span-3 col-span-8 w-full h-full flex items-center justify-start ml-5">
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="font-bold text-lg">LINKS</h1>
              <div className="mt-11 leading-10">
                <Link
                  href="/events"
                  className="flex flex-row items-center cursor-pointer"
                >
                  <TbPointFilled className="mr-4" color="grey" />
                  Praise and Worship
                </Link>
                <Link
                  href="/events"
                  className="flex flex-row items-center cursor-pointer"
                >
                  <TbPointFilled className="mr-4" color="grey" />
                  Our Ministries
                </Link>
                <Link
                  href="/events"
                  className="flex flex-row items-center cursor-pointer"
                >
                  <TbPointFilled className="mr-4" color="grey" />
                  Our Pastors
                </Link>
                <Link
                  href="/events"
                  className="flex flex-row items-center cursor-pointer"
                >
                  <TbPointFilled className="mr-4" color="grey" />
                  Sermons & Exhortations
                </Link>
                <Link
                  href="/events"
                  className="flex flex-row items-center cursor-pointer opacity-0"
                >
                  <TbPointFilled className="mr-4" color="grey" />
                  Our Pastors
                </Link>
                <Link
                  href="/events"
                  className="flex flex-row items-center cursor-pointer opacity-0"
                >
                  <TbPointFilled className="mr-4" color="grey" />
                  Our Pastors
                </Link>
              </div>
            </div>
          </div>
          <div className="sm:col-start-9 col-start-3 sm:col-span-3 col-span-8 w-full h-full flex items-center justify-center">
            <div className="flex flex-col justify-start items-start text-white">
              <h1 className="mb-5 font-bold text-lg">
                FEATURED BLOGS/ARTICLES
              </h1>
              <p>COMING SOON!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
