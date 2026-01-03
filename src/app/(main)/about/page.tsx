import React from "react";

import Services from "./Services";
import Leaders from "./Leaders";
import { Metadata } from "next";
import Title from "./Title";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "About Us | Jesus Glory Athy",
  description:
    "Learn about Jesus Glory Athy, our mission, vision, and the RCCG community in Athy, Ireland. Discover our history and what we believe.",
  openGraph: {
    title: "About Us | Jesus Glory Athy",
    description:
      "Learn about our mission, vision, and the RCCG community in Athy, Ireland.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Us | Jesus Glory Athy",
    description: "Learn about our mission, vision, and community.",
  },
};

const About = () => {
  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar />
        <div className="h-full flex justify-center">
          <Title />
        </div>
      </section>
      {/* <Leaders /> */}
      <Services />
      <Newsletter />
      <Footer />
    </>
  );
};

export default About;
