// import "./ContactStyle.css"
import "aos/dist/aos.css";
import "./style.css";

// import emailjs from '@emailjs/browser';
import AOS from "aos";
import { useEffect } from "react";
import { useRef } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import Logo from "../../assets/351264.svg";
import World from "./World.jsx";

// import Particlesbg from "../Particlesbg.jsx";
// import WorldLottie from "./WorldLottie";
function Contact() {
  const form = useRef();

  //   const sendEmail = (e) => {
  //     e.preventDefault();

  //     emailjs.sendForm('service_o3t5lxg', 'template_fgorclf', form.current, 'gpGpva79IfwwFH4Ql')
  //     .then((result) => {
  //       console.log('SUCCESS!',result.text);

  //       form.current.reset();

  //     })
  //     .catch((error) => {
  //       console.error('Error sending message:', error);
  //       // Add code to display an error popup or message
  //     });
  //   };

  useEffect(() => {
    AOS.init({ duration: 1000 });

    AOS.refresh();
  }, []);

  return (
    <div className="bg-black">
      <div className="screenw bg-[#000000] flex items-center justify-center h-screen ">
        <div
          className="ttr text-white bg-[#100D25] p-11 rounded-3xl ml-[10%] "
          data-aos="fade-right"
        >
          <form ref={form} className="justify-center">
            <p>Get in Touch</p>
            <p className="text-white text-[50px] font-extrabold mb-[15%] ">
              Contact me
            </p>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              name="user_name"
              placeholder="Name"
              className="input h-10 mb-[10%]  rounded bg-[#151030]"
            />
            {/* <br /><br /><br /> */}
            <div></div>
            <label htmlFor="email">Email</label>
            <span> (required)</span>
            <br />
            <input
              type="text"
              id="email"
              name="user_email"
              placeholder="Email"
              className="input h-10 mb-[10%] rounded bg-[#151030]"
              required
            />

            <div></div>
            <label htmlFor="phone">Phone</label>
            <br />
            <input
              type="text"
              id="phone"
              name="user_number"
              placeholder="Phone Number"
              className="input h-10 mb-[10%] bg-[#151030] rounded"
            />
            <div></div>

            <label htmlFor="subject">Subject</label>
            <span> (required)</span>
            <br />
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              className="input h-10 mb-[10%]  bg-[#151030] rounded"
              required
            />
            <div></div>

            <label htmlFor="message">Message</label>
            <span> (required)</span>
            <br />
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message"
              className="input mb-[10%]  bg-[#151030] rounded"
            ></textarea>
            <div></div>

            <button type="submit" className="bg-[#151030]" id="mailButton">
              Send
            </button>
          </form>
        </div>
        <div className="cols-start-2 ml-[200px] " data-aos="fade-left">
          <World />
        </div>
      </div>





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
      <div className="flex justify-center bg-black text-green-700 p-2">
        Copyright will be resolved 2024
      </div>
    </div>
  );
}

export default Contact;
