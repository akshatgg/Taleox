import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Courses from "./Components/Courses/Courses.jsx";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Execute from "./Components/Home/Execute.jsx";

function App() {





  return (
    <div>
    <Router>
      <div>
        {/* Navbar */}
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/About" element={<Navbar />} />
          <Route path="/Contact" element={<Navbar />} />
          <Route path="/Courses" element={<Navbar />} />
          <Route path="/Signup" element={<Navbar />} />
          <Route path="/Signin" element={<Navbar />} />
        </Routes>
        
        {/* Routes */}
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Execute />} />
          <Route path="/About" element={<About />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <Routes>
          {/* <Route path="/" element={<Footer />} /> */}
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
