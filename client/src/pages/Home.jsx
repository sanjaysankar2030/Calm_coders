import "./Home.css"; // import the CSS
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="glass-box">
        <h1>Mental Care Path</h1>
        <div className="stress-test-link">
          <p>
            Go take the Phq-9 test <Link to="/phq-test">PHQ-9 Test</Link> to
            know your stress level.
          </p>
        </div>
      </div>
    </div>
  );
}
