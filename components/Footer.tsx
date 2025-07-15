"use client";

import React from "react";

import { IoMapOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogs } from "@/lib/queries";
import { BlogType } from "@/lib/types";

type ServiceType = {
  name: string;
  link: string;
};

const Footer = () => {
  const [blogs, setBlogs] = React.useState<BlogType[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  const blogBaseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/`;

  const services = [
    {
      name: "About Us",
      link: "/about",
    },
    // {
    //   name: "Our Pastors",
    //   link: "",
    // },
    {
      name: "Sermons & Exhortations",
      link: "/sermons",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
  ];

  React.useEffect(() => {
    setLoaded(true);
    const fetchData = async () => {
      const response = await getAllBlogs();
      setBlogs(response);
      setLoaded(false);
    };
    fetchData();
  }, []);

  return (
    <section className="h-auto w-full bg-med-gr pt-5">
      <div className="h-full w-full">
        <div className="grid-cols-12 grid h-full gap-5">
          <div className="sm:col-start-3 col-start-3 sm:col-span-3 col-span-8 w-full h-full flex flex-col items-center justify-center flex-wrap">
            <div className="flex flex-col justify-center items-start text-white text-le">
              <h1 className="mb-6 cursor-pointer">
                <Link href="/">
                  <Image
                    src="/images/church-logo.svg"
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
                <p>RCCG Jesus Glory Intl, Athy, Kildare, R14 PV38</p>
              </div>
              <div className="flex flex-row mb-8 gap-[10px] cursor-pointer">
                <FaPhoneAlt color="black" size={20} />
                <p>+ 999 999 999</p>
              </div>
              <div className="flex flex-row mb-8 gap-[13px] cursor-pointer">
                <IoMailOutline color="black" size={20} />
                <p>{process.env.NEXT_PUBLIC_EMAIL_ADDRESS}</p>
              </div>
            </div>
          </div>
          <div className="sm:col-start-6 col-start-3 sm:col-span-3 col-span-8 w-full h-full flex items-center justify-start ml-5">
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="font-bold text-lg">LINKS</h1>
              <div className="mt-11 leading-10">
                {services.map((service: ServiceType) => (
                  <Link
                    href={service.link}
                    target="_blank"
                    className="flex flex-row items-center cursor-pointer"
                    key={service.name}
                  >
                    <TbPointFilled className="mr-4" color="grey" />
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="sm:col-start-9 col-start-3 sm:col-span-3 col-span-8 w-full h-full flex items-center justify-center">
            <div className="flex flex-col justify-start items-start text-white">
              <h1 className="mb-5 font-bold text-lg">
                FEATURED BLOGS/ARTICLES
              </h1>
              {!loaded && (
                <div className="mt-5 leading-10">
                  {blogs.length > 3
                    ? blogs.slice(0, 3).map((blog: BlogType) => (
                        <Link
                          href={`${blogBaseUrl}/${blog.id}`}
                          target="_blank"
                          className="flex flex-row items-center cursor-pointer"
                          key={blog.id}
                        >
                          <TbPointFilled className="mr-4" color="grey" />
                          {blog.blogTitle}
                        </Link>
                      ))
                    : blogs.map((blog: BlogType) => (
                        <Link
                          href={`${blogBaseUrl}/${blog.id}`}
                          target="_blank"
                          className="flex flex-row items-center cursor-pointer"
                          key={blog.id}
                        >
                          <TbPointFilled className="mr-4" color="grey" />
                          {blog.blogTitle}
                        </Link>
                      ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
