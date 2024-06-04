// import "./ContactStyle.css"
import "aos/dist/aos.css";
import "./style.css";
import { toast } from "react-hot-toast";

// import emailjs from '@emailjs/browser';
import AOS from "aos";
import { useEffect, useState } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import World from "./World.jsx";
import axiosInstance from "../../Helper/axiosinstance.js";

// import Particlesbg from "../Particlesbg.jsx";
// import WorldLottie from "./WorldLottie";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z6j6qbl",
        "template_fgorclf",
        form.current,
        "gpGpva79IfwwFH4Ql"
      )

      .then(
        () => {
          toast.success("Email send successfully");
          window.location.reload();
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };

  // const [userinput, setuserinput] = useState({
  //   name: "",
  //   email: "",
  //   number: "",
  //   subject: "",
  //   message: "",
  // });

  // function handleinput(e) {
  //   const { name, value } = e.target;
  //   setuserinput({
  //     ...userinput,
  //     [name]: value,
  //   });
  // }

  // async function handleFormSubmit(event) {
  //   event.preventDefault();

  //   if (
  //     !userinput.name ||
  //     !userinput.email ||
  //     !userinput.number ||
  //     !userinput.subject ||
  //     !userinput.message
  //   ) {
  //     toast.error("Please fill every field");
  //     return;
  //   }

  //   if (!userinput.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
  //     toast.error("Please Enter a valid email");
  //     return;
  //   }

  //   try {
  //     // const res = axiosInstance.post("/contact", { ...userinput });
  //     // console.log(res);
  //     toast.promise(res, {
  //       loading: "Loading",
  //       success: "Form submitted successfully",
  //       error: "Some error to send an email",
  //     });
  //     const response = await res;

  //     if (response?.data?.success) {
  //       setuserinput({
  //         name: "",
  //         email: "",
  //         number: "",
  //         subject: "",
  //         message: "",
  //       });
  //     }
  //   } catch (e) {
  //     toast.error(e.message);
  //   }
  // }

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-black">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="screenw bg-[#000000] flex items-center justify-center h-screen ">
        <div
          className="ttr text-white bg-[#100D25] p-11 rounded-3xl ml-[10%] "
          data-aos="fade-right"
        >
          <form ref={form} className="justify-center" onSubmit={sendEmail}>
            <p>Get in Touch</p>
            <p className="text-white text-[50px] font-extrabold mb-[15%] ">
              Contact me
            </p>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              // onChange={handleinput}
              // value={userinput.name}
              name="name"
              placeholder="Name"
              className="input h-10 mb-[10%]  rounded bg-[#151030]"
            />
            <div></div>
            <label htmlFor="email">Email</label>
            <span> (required)</span>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              // onChange={handleinput}
              // value={userinput.email}
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
              // onChange={handleinput}
              // value={userinput.number}
              name="number"
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
              // onChange={handleinput}
              // value={userinput.subject}
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
              // onChange={handleinput}
              rows="4"
              // value={userinput.message}
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Contact;
