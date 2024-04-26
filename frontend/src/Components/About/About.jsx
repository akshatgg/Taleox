import AOS from 'aos'
import { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

import Logo from "../../assets/351264.svg";
import tree from "../../assets/aboutMainImage.png";
import { Celeberation } from "../../Constants/Celeberation";
import Carouserslide from "./Carouserslide";

function About() {
  const [currentInfluencerIndex, setCurrentInfluencerIndex] = useState(0);

  const goToPreviousInfluencer = () => {
    setCurrentInfluencerIndex((prevIndex) =>
      prevIndex === 0 ? Celeberation.length - 1 : prevIndex - 1
    );
  };

  const goToNextInfluencer = () => {
    setCurrentInfluencerIndex((prevIndex) =>
      prevIndex === Celeberation.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
AOS.init({duration: 1000})
AOS.refresh();
    // Add scroll event listener when component mounts
  }, []);

  return (
    <div className="h-screen bg-[#000000] flex flex-col justify-between">
      <div className="">
        <div className="flex justify-center items-center max-h-[700px]">
          <div data-aos="fade-right">
            <p className="text-[#EAB308] text-5xl font-semibold font-serif">
              Affordable and quality education
            </p>
            <p className="text-white font-serif mt-8 text-xl">
              Our goal is to provide affordable and quality education to the
              world. We are providing the platform
              <br /> for aspiring teachers and students to share their skills,
              creativity, and knowledge with each other to
              <br /> empower and contribute to the growth and wellness of
              mankind.
            </p>
          </div>
          <div data-aos="fade-left">
            <img src={tree} alt="tree" />
          </div>
        </div>





        <div className="bg-black">
          <div className="flex justify-center items-center mt-[3%]">
            <div onClick={goToPreviousInfluencer} className="cursor-pointer">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </div>

            <div className="max-w-[500px] overflow-hidden" data-aos="zoom-in-up">
              {/* Render current influencer */}
              <Carouserslide {...Celeberation[currentInfluencerIndex]} />
            </div>

            <div onClick={goToNextInfluencer} className="cursor-pointer">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#383737] text-white mt-[100px] p-4">
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
        <div className="flex justify-center bg-black text-white p-3">
          Copyright will be resolved 2024
        </div>
      </div>
    </div>
  );
}

export default About;
