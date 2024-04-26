import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Courses from "./Components/Courses/Courses.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
// import Error from "./Error/Error";
// import OutletP from "./Outlet/OutletP";
// import Signin from "./Signin/Signin";
// import Signup from "./Signup/Signup";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/About" element={<Navbar />} />
        <Route path="/Contact" element={<Navbar />} />
        <Route path="/Courses" element={<Navbar />} />
        {/* <Route path="/Signup" element={<Navbar />} /> */}
        {/* <Route path="/Signin" element={<Navbar />} /> */}



        </Routes>
    

        <Routes>
          {/* <Route path="/Signin" element={<Signin />} /> */}
          {/* <Route path="/Signup" element={<Signup />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Footer />} />
        
        </Routes>
      </div>
      </Router>
  );
}

export default App;
 