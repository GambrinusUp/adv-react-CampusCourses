import './App.css';
import 'antd/dist/reset.css';
import './index.css';
import Registration from "../src/components/pages/registration"
import Authorization from "./components/pages/authorization";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from "./components/pages/start";
import Profile from "./components/pages/profile";
import Groups from "./components/pages/groups"
import Navbar from "./components/UI/navbar";
import React from "react";
import Courses from "./components/pages/courses";
import Course from "./components/pages/course";
import MyCourses from "./components/pages/myCourses"
import TeachingCourses from "./components/pages/teachingCourses";
function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path='/registration' element={<Registration />} />
              <Route path='/authorization' element={<Authorization />} />
              <Route path='/' element={<Start />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/groups' element={<Groups />} />
              <Route path="/groups/:id" element={<Courses />} />
              <Route path="/courses/:id" element={<Course />} />
              <Route path="/courses/my" element={<MyCourses />} />
              <Route path="/courses/teaching" element={<TeachingCourses />} />
          </Routes>
      </Router>
  );
}

export default App;