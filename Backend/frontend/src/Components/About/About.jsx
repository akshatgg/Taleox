import AOS from 'aos'
import { useEffect, useState } from "react";



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
    <div className=" bg-[#000000] flex flex-col justify-between">
      <div>
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
            <br/>

            <br/>
            <br/>
            <br/>
            <br/>

            <br/>
            <br/>
            <br/>
            <br/>

            <br/>
            <br/>
            <br/>
        </div>





      
      </div>
    </div>
  );
}

export default About;
