import "./Execute.css";
import { Element } from "react-scroll";
import Particle from './Particle.jsx';
import Home from './Home';

function Execute() {
  return (
    <div className='col' >
      <Element name='animation'>
        <Particle/>
      </Element>
      <Element name='Home'>
        <Home/>
      </Element>
      
    </div>
  )
}

export default Execute
