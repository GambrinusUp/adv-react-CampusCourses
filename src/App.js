import './App.css';
import 'antd/dist/reset.css';
import './index.css';
import Registration from "../src/components/pages/registration"
import Authorization from "./components/pages/authorization";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from "./components/pages/start";
import Profile from "./components/pages/profile";
import Groups from "./components/containers/groupsContainer"
function App() {
  return (
      <Router>
          <Routes>
              <Route path='/registration' element={<Registration />} />
              <Route path='/authorization' element={<Authorization />} />
              <Route path='/' element={<Start />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/groups' element={<Groups />} />
          </Routes>
      </Router>
  );
}

export default App;