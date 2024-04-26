import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#000000] text-white fixed left-0 bottom-0 w-full">
      <div className="flex justify-around items-center h-full px-4 max-w-[1440px] mx-auto">
        <div>Copyright 2024 | All rights reserved</div>

        <div className="flex">
          <div className="ml-4 text-2xl hover:text-[#EAB308]">
            <FaFacebook />
          </div>
          <div className="ml-4 text-2xl hover:text-[#EAB308]">
            <BsInstagram />
          </div>
          <div className="ml-4 text-2xl hover:text-[#EAB308]">
            <FiTwitter />
          </div>
        </div>
        
        <div className="flex flex-col">
          <Link to="/About">
            <div className="underline hover:text-[#EAB308]">About</div>
          </Link>
          <Link to="/Contact">
            <div className="underline hover:text-[#EAB308]">Contact</div>
          </Link>
          <Link to="/Courses">
            <div className="underline hover:text-[#EAB308]">Courses</div>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
