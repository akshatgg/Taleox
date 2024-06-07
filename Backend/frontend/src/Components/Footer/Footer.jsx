// import "./ContactStyle.css"
import "aos/dist/aos.css";

import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import Logo from "../../assets/351264.svg";

function Footer() {
  return (
    <div>
      <footer className="bg-[#383737] text-white p-4 ">
        <div className="flex justify-around items-center h-full px-4 max-w-[1440px] mx-auto">
          <div className="flex flex-col">
            <div>
              <img
                src={Logo}
                alt="Open LMS Logo"
                className="w-auto h-24 text-white"
              />
            </div>
            <div>
              <p>
                A learning management system (LMS) is a software Application
                <br />
                which is used for administration, documentation, reporting and
                delivery of
                <br /> educational courses or training programs. LMS in the
                college help the Faculty
                <br />
                Member to deliver material to the students, administer
                <br /> tests and give assignments and track student progress.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl text-[#EAB308] font-semibold mb-7">
              Info
            </div>
            <div className="underline">Central e-Book Bank</div>
            <div className="underline">KIET Website</div>
            <div className="underline">KIET Website</div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="text-[#EAB308] text-3xl font-semibold mb-6">
                Contact us
              </div>
              <div>Taleo Delhi-NCR, Meerut Road (NH-58) Ghaziabad-201206</div>
              <div>Phone : 8744097774</div>
              <div> E-mail : itsupport@kiet.edu</div>
            </div>

            <div className="flex mb-[-20px] mt-3">
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
          </div>
        </div>
      </footer>
      <div className="flex justify-center bg-black text-green-700 p-2">
        Copyright will be resolved 2024
      </div>
    </div>
  );
}

export default Footer;
