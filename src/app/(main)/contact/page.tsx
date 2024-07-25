import React from "react";
import Navbar2 from "../../../../components/Navbar2";
import Newsletter from "../../../../components/Newsletter";
import ContactForm from "../../../../components/contact/contact-form";

const page = () => {
  return (
    <section>
      <Navbar2 />
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
        <div className="sm:absolute bottom-[-60px] left-[150px] h-screen sm:h-[650px] sm:w-[450px] bg-light-gr">
          <ContactForm />
        </div>
      </section>
      <Newsletter />
    </section>
  );
};

export default page;
