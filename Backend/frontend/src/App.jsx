import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import CourseList from "./Components/Courses/CourseList.jsx";
import Change from "./Components/Navbar/Change.jsx";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Execute from "./Components/Home/Execute.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {





  return (
    <div>
    <Router>
      <div>
        {/* Navbar */}
        <div className="z-1000">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/About" element={<Change />} />
          <Route path="/Contact" element={<Change/>} />
          <Route path="/Courses" element={<Change />} />
          <Route path="/Signup" element={<Change />} />
          <Route path="/Signin" element={<Change />} />
        </Routes>
        </div>
        
        {/* Routes */}
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Execute />} />
          <Route path="/About" element={<About />} />
          <Route path="/Courses" element={<CourseList />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <Routes>
          <Route path="/About" element={<Footer/>} />
          <Route path="/Contact" element={<Footer/>} />
          <Route path="/Courses" element={<Footer/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
