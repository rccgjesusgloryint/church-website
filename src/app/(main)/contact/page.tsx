import React from "react";
import Navbar2 from "../../../../components/Navbar2";
import Newsletter from "../../../../components/Newsletter";

const page = () => {
  return (
    <section>
      <Navbar2 />
      <div className="h-[470px] bg-light-gr flex items-center justify-center">
        <h1 className=" font-medium text-4xl text-white tracking-wider">
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
        <div className="sm:absolute bottom-[-100px] left-[150px] h-screen sm:h-[720px] sm:w-[540px] bg-slate-300">
          CONTACT FORM
        </div>
      </section>
      <Newsletter />
    </section>
  );
};

export default page;
