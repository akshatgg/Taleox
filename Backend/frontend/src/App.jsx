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
import Denied from "./Components/Denied/Denied.jsx";
import CourseDescription from "./Components/Courses/layout/CourseDescription.jsx";
import NotRequireAuth from "./Components/Auth/NotRequireAuth.jsx";
import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import CreateCourses from "./Components/Courses/CreateCourses.jsx";

function App() {
  return (
    <div>
      <Router>
      
          {/* Navbar */}
          
            <Routes>
              <Route path="/" element={<Navbar />} />
              <Route path="/About" element={<Change />} />
              <Route path="/Contact" element={<Change />} />
              <Route path="/Courses" element={<Change />} />
              <Route path="/Signup" element={<Change />} />
              <Route path="/Signin" element={<Change />} />
              <Route path="/Course-Description" element={<Change />} />
            </Routes>
       
       
         <Routes>

          {/* Routes */}
          <Route>
            <Route path="/" element={<Execute />} />
            <Route path="/About" element={<About />} />
            <Route path="/Courses" element={<CourseList />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Denied" element={<Denied/>}/>
          </Route>

          {/* <Routes element={<NotRequireAuth />}>
          </Routes> */}

          <Route >
            <Route path="/Course-Description" element={<CourseDescription />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/course/create" element={<CreateCourses/>} />
          </Route>
       </Routes>


       
<Routes>
          {/* Footer */}
          <Route>
            <Route path="/Course-Description" element={<Footer />} />
            <Route path="/About" element={<Footer />} />
            <Route path="/Contact" element={<Footer />} />
            <Route path="/Courses" element={<Footer />} />
          </Route>
          </Routes>
      </Router>
      </div>
  );
}

export default App;
