import "aos/dist/aos.css";
import "./Home.css"
import AOS from "aos";
import * as dat from 'dat.gui';

import Lottie from "lottie-react";
import { useEffect } from "react";
// import ParticleSlider from 'path/to/particle-slider-library';
import animation from "../../assets/Animation - 1708716005607.json";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
    // Apply styles to the body to hide overflow
    // document.body.style.overflowY = "hidden";
    // Clean up function to remove styles when component unmounts
    return () => {
      // document.body.style.overflowY = "auto";
    };
  }, []);
  useEffect(() => {
    const init = () => {
      var isMobile =
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
      var isSmall = window.innerWidth < 1000;

      var ps = new ParticleSlider({
        ptlGap: isMobile || isSmall ? 3 : 0,
        ptlSize: isMobile || isSmall ? 3 : 1,
        width: 1e9,
        height: 1e9,
      });

      var gui = new dat.GUI();
      gui.add(ps, 'ptlGap')
        .min(0)
        .max(5)
        .step(1)
        .onChange(function () {
          ps.init(true);
        });
      gui.add(ps, 'ptlSize')
        .min(1)
        .max(5)
        .step(1)
        .onChange(function () {
          ps.init(true);
        });
      gui.add(ps, 'restless');
      gui.addColor(ps, 'color').onChange(function (value) {
        ps.monochrome = true;
        ps.setColor(value);
        ps.init(true);
      });

      window.addEventListener
        ? window.addEventListener('click', function () {
            ps.init(true);
          }, false)
        : (window.onclick = function () {
            ps.init(true);
          });
    };

    const initParticleSlider = () => {
      var psScript = document.createElement('script');
      psScript.src =
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js';
      psScript.setAttribute('type', 'text/javascript');
      psScript.onload = init;
      document.body.appendChild(psScript);
    };

    initParticleSlider();
  }, []);

  return (

    
<div className="bg-[#050505] " style={{ height: '200vh' }} id="particle-slider">


    <div className="slides">
    <div id="first-slide" className="slide" data-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAGQCAMAAABh+/QGAAAC9FBMVEXu7u7u7u7////5+fn////u7u78/Pz7+/v////////////5+fn////////////7+/v////////////39/f////6+vr+/v76+vr////////39/f////v7+/9/f3v7+/////////+/v74+Pj////////////////////8/Pz5+fn////////////w8PD+/v7z8/P////7+/v////////9/f3u7u7////////4+Pj////////////////////////////////////u7u7////6+vr////09PT////////////////////////////////4+Pj////////y8vL////////////////////////v7+/////////////09PTu7u79/f3////////39/f////////////////////////////////////////////8/Pz////29vb////////z8/P////////////////x8fH////////////////////////z8/P////z8/P////////////////////////////////////19fX////v7+/x8fH////////////////////39/f////////w8PD////////x8fHz8/P////////////z8/P19fX////19fX////////////y8vL////29vb////x8fH////29vb////////////////////////////////v7+/////////////////x8fH////////19fX19fX////////x8fHw8PD09PT29vb////////w8PD////////y8vLw8PDw8PDy8vL09PTv7+/////////////////////////////////////////////////////////////////4+Pj////v7+/////y8vL///////////////8AAADu7u7u7u7v7+/y8vL19fXz8/P29vb5+fn4+Pj09PT39/f6+vr9/f37+/v8/Pz+/v7v7+////8Ohw90AAAA6nRSTlP+/VG3EfiorVyeTbVdYkysPhdSvl+yobNjU8Fg9qf3NWGjuzuEG0kSq7YfHVjuotZtrpwypftBIryRXlcWnXaNm5P5g7CQ0RpkixNFlHs9vXpW3UoUfk98dPRONn3Q/Kaaj8JlhkMZQGqKSDMuDKpQxnFm1xCgZ4zmhSZUKzgo1HLYmWsciG5sMBhoyUfy5440cHOJwJdb62+S4dOCeTrZy5XIloGY2yPHf+MnwzcsP0RCIC1p8yl1OTziJDHMzRVG5OjOxQ0v7YAl4Ozp3NLvBw4hKggKCwUDCR4GAQQCD7mH8UveWnd4VQDbCiR9AAAUpUlEQVR42uzTMQEAAAjAIPs3tYUJ/HdAB2aBlyAgCAgCgoAgECEICAKCgCAgCEQIAoKAICAICAIRgoAgIAgIAoJAhCAgCAgCgoAgECEICAKCgCAgCEQIAoKAICAICAIRgoAgIAgIAoJAhCAgCAgCgoAgECEICAKCgCAgCEQIAoKAICAICAIRgoAgIAgIAoJAhCAgCAgCgoAgECEICAKCgCAgCEQIAoKAICAICAIRgnDs1aFKBFEYhuH7Ea/BuHgdm4wmk2iw6SUsdoNJZM2CeYNbJjhNlAmjsA6CnCLKjjocF9f2w3me9N3Ay4dAQCAgEBAIBCEQEAgIBAQCAoEgBAICAYGAQEAgEIRAQCAgEBAICASCEAgIBAQCAgGBQBACAYGAQEAgIBAIQiAgEBAICAQEAkEIBAQCAgGBgEAgCIGAQEAgIBAQCAQhEBAICAQEAgKBIAQCAgGBgEBAIBCEQEAgIBAQCAgEghAIlBRItT3pnk427xoQSOZglD6NNxoQyFB11aWlds+JIJCB6Sj9ML5oQCC9aqtLA+2xE0EgS9NZypw7EQTyoe7vw4kgkMx8lla4uW2g7EDqhy6t1F46EYoOpL8PJ4JAMvXjIv3heceJUGgg80law64TocRAvu7DiSCQzP5hWtuZE6GsQOrTRfqHlyMnQkGB/HIfr9ff+/7NiVBuIO/snWl0FFUWx89sZ/ZFZ3OcxXVchnFB3AVFVHRURBGRRUAEgREQRUA2kSXs+74YEASRJSBJSIAkJDEkJCQBErKQTC8BaRNvnyYNWTrd534ZjxxT9fpVdb+uruU9qd83vlCPw/2df/frW/e6XqTjY+nmBukPXy1eQofIPDtEbK4IQfbdRcfH+7UgFwTKX6dD5JMHwMbm+y6IUnxMOgRACgKQ+6UdIjY8CjL+8Lhzf7/2vaUlJXkfrr7ziev3VusaH+8pxgctiHKIfAY2NtYJkrO2y1IMJ+h5/C86SeLqcQnD+eIQgJIgALmn6BC52w02NpYIsmBudgBVuPjnh+sMiY/gf2pBTRAon2VIiFS+8LUaV+/P+qdeCtZKj2HlMLBRs/dq9b8k96YF3B15T/+XEyB2cmUPslqQ/X9sxYhcnLA8zvh4VS0+aEG+4zmFEJkbXwWXTfZjRJq+6PjqiOq4LVzVjDFzFlhwzrsPI+NL6pGl4chzDDryobsQMbRzNMSKByUsFcT90g5kYFEyaCd1Jh0f/62FyIJA+ach+hjxhEjVFmThUv6MDhAHVdmIBgninIAsbJxREOORjxh05Kmt+C2NyaIK8lYvZGTnKD3j4wMANUEk9tMh0hhHiDyFrIQWPVwJWvkUDRNkHDLifTGm82816Mgp7bnk2yOkIKdvRHZCs8aDBkYrxUclsAgCBUohkgnayGnFGOhWXwCaWNBmmCDONGSm9E1g5iqjjvyQ7Dy3iieI+91mjIm/jY09Pl6j42M3ER+0INFCZL22EPk3xoa3aAxoYC0aJkgqxkBojgsY+cqoI09CiXyHaII8/QbGzA1VMcbHx3R8rKoEdkGgYA0dIls0hchBjJUlU814DLsgL2NMrB5j9ZF9KGONYIJ83g01UHwc2DmjFB97AVgEkXjzDn1CpAFj5/cpxj+GXZDzGBsf1ll8ZB/KuVsoQRa2oSZKzgArx5jigxaEJUSOHDencn1fCywIZlfxJEgwVxxBnHNQnVavtxVVuJTMHB+v0PGRsReAQRA6RArpEFnhNqdyHy8TVxDsyJMg6EsXRRD3GlQk49O5i0/XwjdUTz+//t4SpHgmjvhom1MJ2gSBgm3xh0gDauPoreIKgrN5EgRLewsiyDakCd74s+EQRsK4N4Io533W+NjVyhYftCAqJNMhcvFdtxmCYEYHcQVpyeRJEMx3CCFID6RIW9kZFElIlDU33F7DGB876Pg4VwnxCAIFW+kQyT6usXLfrqdI3NBxZiMqsiRd82OYmRqjIDvraTY99ksvhtHTwiPTguAsEQQ5gOEUDo1gdm29Fy/jKdceHwMANAhCcH98IdKAUR/jPrbiRxeR5ieZoPExOkELcg4Uce9/EEn2W3hkH1Ks51+Q3CCStBTVQkTGbwjgNwzqACzMP6EQH2UQvyAwRiFEjk7RuXLrrjmiELAJggjyDbn9yB5ovgQJvsW7ICne8BLLhKhszkBs2csUH0V0fGyU4oNZEPYQmeHWu3I3n6VEfK9KGEGgMzmV7xhXgqBvGt+C1BzV1JEwZnBordb4GFYGegkC1c8rhYjulXuY6uGcII4gUOdBGcv4EgRLc7gW5DUk8PcHRgZAdBzbFeLjOgDtgtCMUAiRlW69K9e1sglJHhZHEPjMjxL9OBME33FwLEgF+f/uXQ468oCW+KAF0RIiw3Wv3OWlSNCcLo4g0BdlTOdMEHydX0GcW1DOoH2gI73T6NYtJgGLYvwh8vMSOqeqda/c8iQkGOgUR5DaQSgxjjdB8F1uBXkE5fiyQE+2UfExuYzpRdg2bKelvgaiU/04FSJF+leu4zYkGCqOIDAEJTZwJ0jwZU4FcRQSxzwPeuL2aYqPUcVIcDJdU4jkGVC57sEox9tbHEGeQ4me3AmCvlQ+BZmIcraDrgxHkmUOFmVvprqKWx5lCpEJSOIyoAwc5CszW8UR5FmUOMGDIKHwqyweBXGdIi4TakBX/ockpYchKp2KUYHu0yEqt/RDkjojyqB6N6Hu08IIArKGgHU8CPJlFyT4xMGhIC+hDH8CGCsIBoZUQUQcT7ShIi0Ho8hb1wXRDEFgWiMRiuIIIq9NLgRxLEKCezgUhOihOAi6C0KRFzFEsjyoysCIIfJWGpokCAxFGc29RRHEFcB2dnMhCOSUIsFK7gRJRxkZZ0wQBAPLalXjI7ENI3Cxr1s1Pu4JoWmCOLNRRoMogkxBiY/4EARSw14w/A1vgkxGGWPBCEFo8jarxMcJjMLAPSrxsQTRPEFgtNzjEqcggvwaJd7mRBA4Hwy7yuJMkHUo4XGaJAgGHqtl60lh6yAp7xpCUwWBrijjkCCC9ESJIl4EgRlIUJLDlSDpKOOvYJQgNEsPMbQ0tr7yWIChDVFaQGWaICnyCBkihiDTAijxC24Ega5IsMXBkyAjUcJfbagg9BqQaB3xO44BbM6L9EKUtDjEZEGgI0pkiCHIgygRLOdHEMdOJPg5T4I8iRJ3gkmC0KPc4ZhCfBR9e2VQuyyg/lattHrKREHoeW3DRRBkIfGLAxfdvJcFoa6yDvIjiNuLEouNFSSktAxE/X3cE/Pb38NQCJEVbmlliCWCuLqhxFoBBOlziWgh40kQ2Bd2ldWfG0EqUMJfZqwgPQ+2KAx0Vxnn0LpdduNcNSSgMN9HZV/IhYnFZggCa1CiK/+CTGxFGf46rgSBW8KvsngR5BGUWA3GCnIW0k8qzXRXGiZ3IgsIDpcqTRpVmvOelAIeUwSZihIzeRckKwkJVvHxTnq7ILACCe7I4USQRJTYZbggUFNPh8huhWFyiQ4Io+ophesshfhY6ASTBHlWdqCmGp4FOf2HB0NI4F/AmyAwCwmyHXwIci9KjDVeEICKkxgVTxYo8Lt1GJX80wAmCEKP8U+J4THNXlVOxSlIi1eBFqToCxKGHpldEEc+EvyJD0G2oMQeMwQBV30TRqTtCQcoUvVQACNy4YATTBGEvgAcoc+YQl88grAz0wUSZh+ZFkT5KqueC0EmoUSZKYIAVHyEESjuBKp8HjFE3jkNYKYgq1DiJZEEuTAFOBQEKsKvsngQ5AfYjh9MEgRcm5pU4+NmB0SgekMIVfCPdIK5gqxAidkCCRLsD1wKAouDpMepHAhyAdv5h2mCAEy7SyU+lrO9VUuz8zSAyYL8CiUaBBLkAHAqCMxFglM51guCEktNFARcLzYhMo5zoEczUDTPdoLpgnyFEpuEESQ4DrgVJHwX8ECH5YJcskqQTYqCOICA+VOWf6QtCBsX+gDHgoRfZd1guSBeKz5iqX9PLx4FBOzf098x/yPWRAE/Yn18HHgWBJ4tRYIGqwW5w5Iv6Q1NTHe8NFUbAqiC/4DZX9L7osQ8IQTxbzoDfAsC030oJ9DfYkE83F3zejoBAftvhfn2NW9Emp9aAMC7IOF7OJpTrRXkEwt+KGzBiLQl2j8U6i9I8Mi8OgABBIF5SLAkh5tWkz68tJr0ygIFXijFqCSl2K0m4aRNOnnb9rG3AgF/rSaqw2pPOq6kZsVH2ZoVt9vNiro0K9JwsDWOEiTKVdZgu92dod09T2EnunK7+78saHf/mPd2d5EEgR+HX2XZL0wpvDBVxPsLU1tRoostiI6CwBQfygn1sV+5jfjK7U08vnLr7ocS19iC6CkI7A+inMbR9tAGpZk/u3ge2vAmysi0BdFVEBiJBGmdLRNktohjf2ZwMPbnpyixToyxPwIJQl1lVdqD4yCLcXDcQB4Gx+0JiDc4TiRBXOFXWU4eRo/2snr0aJswo0cnoIzNtiB6CwLjS5Fgk1WCDONqeHUvjMLA6fbw6itCEMgMu8r6oUWCVKCMjdyvP6jhY/3BESHXHwglCCSHXWXN52GBTl/LF+h08qAq3blcoNMozAIdsQSBA0iQtsBewXZ5gyf3K9gqRF3BJpYg1FVWlTVLPInfEfI5WOIp7YAmN0HzssSzajfKaBJoiadggtQkIcHgYisEgYXcrYEum0yvga7nZw30alHXQIsmCNTlIUHIEkEchSgjuBj0xO2jB5cwsLw4LD4qgEJt5InBv+C5B6Mcb29bEMMEgUwvElgiCDyCcnzzQU+2aZpdAmXDZCHS1OACTfNOivQvA8dtSDAObEGMEwSSWzkQxLkF5QzaBzqSk4aoKUS2YzvPMMcHycYxupdBeRISdHfbghgpCBzgQBCoaEI53kOgI5/RHSRtwxhCpCGm/5/q50P0C1XDdS+DUXlI0LIPbEEMFQSe50AQeA0JGvsAIwOAgml57cbr9BVkRKFST4reZeCa0YQks8EWxGBBaq7lQJCao0gQmuMCBqoHh9YCA1kaQoQQREt87NG9DG6i/hm/tbzavv+CQN0k6wWBFG94fWVCVD7IQGzZCwwo9bJvHKCXIPcXKnXE610GH5ylLPRUW15tV4AgkOm1XhDIDSJJS1EtRGT85SFugzoAC/MVQuRcmR6CjNmqEB9TdC6DuuuPIEVagvXVdiUIAsmXrBdE4bagcKgDVKmt/05rTzloDZGMAYyCGBAf7GXgTl1/+0Wk6Xacg2q7IgSBhRwIAj2QIm1lZ1AkIfE+bOf2GmDi2A6FEKmMT5AChfjIPq6xDN6up9j10JOeJlSkX4XmxzAzlRNB/s/e3cRGWcRxHI8X7gaVmGh8SbgQBGIgGg8eNAbRKAgJXIwHoEFFg8iLHiANGGqAxIO0DUjAYiMl1L4JCtJYqAFUaqotu6WbsFsTEfdPQqB9WtpmLkLSLJSZXeeZXXZnfb6f+2afw3zzu804fbJ7ILo9HgQi9Uo38mStdl/l9BXVY+pOH4kN89UMJ5ryCaTNMB9rU+GOgaPOGUX4mz89CcThkwsbSH+1B4GkapTRiZo5p3oTctNA45Ldc7uU5mUR9xHZFnMN5Ey9eT6KEUj3K36ctogEIgOHSx+IXNylshu5EqhsBtvEekQGDSPiFkjFz6bL5IpzDA7EPDltUQlE2u8rfSAiR0eVk64LYuusftPo2K5Y+EDO1IwbLpMrzjG4mvbmtEUmEGkb9CAQWfWCcnAuzME03TR6uClsIBVPmeajOMegusGf0xadQORDHwKR+ctVaE/EReM6IuZAbOaj7ldxcEyF9V3a5W/KL5BjvgUiL006MSUKRFJrAxXKI2skrOSbhhHZbB9I6+/6fOxOiYuZKpwrv7wvDmrLL5C/vQukf6HSfuoeiLveZ5W98a3rxcF7X5ruebcLxHSne127uDk5okKYd7lHnGwfLbtA7h/1LRAZ+EJlPF28QHTvLlaWDq0WjfOIdG62CMR9Psz2KFvjdQ8kxNXXZReI1HsXiLS/pSYMNZYyEEm9cVBZ2Nkm7o5sMYxI4r8C6THMx84GcRf/UdkYPP35DMlDvKPsAol3eBeI7J/48VitFDcQXeuDIyqn6xsek7wklxlG5HjuQF41zEdVSvLxx8pA5XRty5RlFX2Sp9iCoMwCkdg7gW+BSOPUG0qpgy1S8kBEtld13Mhax7TnBkRTiBFZkMgeSM9W43zkK9GSzqp19XQpkPiqdFg/2Nwbk77tiBRWvOUefPKadMZfEt78JUs3ifgQyE0nax/6TD/Dlw483CeW3EdED+SUPh9BVUqA4gWiW//6xm2PLl/3W1fXT5XVs158vKlPCqh5nenhED0Q8zMgXzUIYB1IOUq+po/Ix8e1QEwPSQVzmA/83wPJNiKTAmE+EN1AJLloSH+Aav+dgRiekAo+vShAFAIRaZ6tj0inyrhkmI9nBIhKIJkRMWM+EPFARJorlbVDzAeiFogk91mOSPAJ84HoBSKyqdJqPnoFiGIgNiNyjflAZAMROb9X5fQB84EoByLJf4ZyzMfbzAeiHcitEWE+QCDZJS8PK4OrR5kPEMgt57uV5jTzAQK5PSLMBwjEdkS+YT5AIJP0Pz+cmY8dzAcI5G7fd0/Mx7cCEIimf2Pl0HDdTOYDBAIQCEAggJ8IBCAQgEAAAgEIBPAEgQAEAhAIQCAAgQCeIBCAQAACAQgEIBDAEwQCEAhAIACBAAQCeIJAAAIBCAQgEIBAAE8QCEAgAIEABAIQCOAJAgEIBCAQgEAAAgE8QSAAgQAEAhAIQCCAJwjkX/bpWAAAAABgkL/1NHaUQyAICAKCgCAwIQgIAoKAICAITAgCgoAgIAgIAhOCgCAgCAgCgsCEICAICAKCgCAwIQgIAoKAICAITAgCgoAgIAgIAhOCgCAgCAgCgsCEICAICAKCgCAwIQgIAoKAICAITAgCgoAgIAgIAhOCgCAgCAgCgsCEICAICAKCgCAwIQgIAoKAICAITAgCgoAgIAgIAhOCgCBQ+3RMAwAAwDDIv+u5WHqABwQBQUAQiBAEBAFBQBAQBCIEAUFAEBAEBIEIQUAQEAQEgacB7rniTaf7XcMAAAAASUVORK5CYII=">
    </div>
  </div>
  <canvas className="draw"></canvas>










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