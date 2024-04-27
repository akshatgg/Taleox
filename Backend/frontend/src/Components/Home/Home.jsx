import "aos/dist/aos.css";

import AOS from "aos";
import Lottie from "lottie-react";
import { useEffect } from "react";

import animation from "../../assets/Animation - 1708716005607.json";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
    // Apply styles to the body to hide overflow
    document.body.style.overflowY = "hidden";
    // Clean up function to remove styles when component unmounts
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <div className="bg-[#050505] h-screen">
      <div className="flex justify-center items-center min-h-[700px]">
        <div data-aos="fade-right">
          <p className="text-5xl font-bold text-white font-serif ">
            Find out best
            <span className="text-[#EAB308]">Online Courses</span>
          </p>
          <p className="text-white text-xl mt-6">
            We have a large library of courses taught by highly skilled and
          </p>
          <p className="text-white text-xl">
            qualified faculties at a very affordable cost.
          </p>
          <div className="flex flex-wrap mt-10">
            <div>
              <button className="bg-[#EAB308] text-white text-[18px] rounded-lg p-3 font-sans font-semibold hover:bg-[#eab208e1]">
                Explore courses
              </button>
            </div>
            <div className="ml-5">
              <button className="text-white border-[#EAB308] rounded-lg border p-3 text-[18px] hover:bg-[#eab208ef]">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div data-aos="fade-left"> 
          <Lottie
            animationData={animation}
            loop={true}
            autoplay={true}
            className="h-[500px]  col-start-1"
          />
        </div>
      </div>
      </div>
  
  );
}

export default Home;