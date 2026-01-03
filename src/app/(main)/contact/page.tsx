import ContactForm from "@/components/contact/contact-form";
import Navbar from "@/components/navbar/Navbar";
import Newsletter from "@/components/Newsletter";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Jesus Glory Athy",
  description:
    "Get in touch with Jesus Glory Athy. Find our location, service times, and contact information. We'd love to hear from you!",
  openGraph: {
    title: "Contact Us | Jesus Glory Athy",
    description:
      "Get in touch with us. Find our location, service times, and contact information.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Jesus Glory Athy",
    description: "Get in touch with us. Find our location and service times.",
  },
};

const page = () => {
  return (
    <section>
      <Navbar />
      <div className="h-[470px] bg-about-bg bg-cover flex items-center justify-center">
        <h1 className="text-white font-bold sm:text-[80px] text-[35px]">
          CONTACT US
        </h1>
      </div>
      <section className="h-screen w-full relative">
        <iframe
          className="hidden sm:block w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAP_EMBED_API}&q=${process.env.CHURCH_LOCATION}`}
          allowFullScreen
        />
        <div className="sm:absolute bottom-[-180px] left-[120px] h-screen sm:h-[600px] sm:w-[450px] bg-card">
          <ContactForm />
        </div>
      </section>
      <Newsletter />
      {/* <Footer /> */}
    </section>
  );
};

export default page;
