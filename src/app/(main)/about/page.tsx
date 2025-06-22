import React from "react";
import Navbar2 from "../../../../components/navbar/Navbar2";

import Services from "./Services";
import Leaders from "./Leaders";
import Newsletter from "../../../../components/Newsletter";
import Footer from "../../../../components/Footer";
import { Metadata } from "next";
import Title from "./Title";

export const metadata: Metadata = {
  title: "Jesus Glory Athy - About",
};

const About = () => {
  return (
    <>
      <section className="h-screen bg-about-bg bg-cover">
        <Navbar2 />
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
