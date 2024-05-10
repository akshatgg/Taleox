import "./Execute.css";
import { Element } from "react-scroll";
import Particle from './Particle.jsx';
import Home from './Home';
import Footer from "../Footer/Footer.jsx";

function Execute() {
  return (
    <div className='col' >
      <Element name='animation'>
        <Particle/>
      </Element>
      <Element name='Home'>
        <Home/>
      </Element>
      <Element name='footer'>
        <Footer/>
      </Element>
    </div>
  )
}

export default Execute
