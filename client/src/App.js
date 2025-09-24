import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Home";
import PhqTest from "./pages/Phq-9";
import Chatbot from "./pages/Chatbot";
import StressTest from "./pages/Stresstest";
import Appointment from "./pages/Appointment";
import Spotify from "./pages/Spotify";
import "./App.css";
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Landing</Link> |<Link to="/phq-test">PHQ-9 Test</Link> |
        <Link to="/chatbot">Chatbot</Link> |
        <Link to="/stress-test">Stress Test</Link> |
        <Link to="/appointment">Appointment</Link>|
        <Link to="/spotify">Ambient Music</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/phq-test" element={<PhqTest />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/stress-test" element={<StressTest />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/spotify" element={<Spotify />} />
      </Routes>
    </Router>
  );
}

export default App;
