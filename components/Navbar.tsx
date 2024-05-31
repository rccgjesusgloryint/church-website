import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <ul className="flex flex-row font-normal gap-7 justify-end m-0 pt-11 pr-11 cursor-pointer">
      <li className="hover:text-gray-700 duration-200">Home</li>
      <li className="hover:text-gray-700 duration-200">About</li>
      <li className="hover:text-gray-700 duration-200">Blog</li>
      <li className="hover:text-gray-700 duration-200">Events</li>
      <li className="hover:text-gray-700 duration-200">Support</li>
      <li className="hover:text-gray-700 duration-200">Gallery</li>
    </ul>
  );
};

export default Navbar;
