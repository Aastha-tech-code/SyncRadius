import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Activity,
  MapPin,
  ArrowRight
} from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">

      <div className="hero-content">

        {/* LEFT SIDE */}

        <div className="hero-left">

          <span className="hero-tag">
            BUILD • CONNECT • GROW
          </span>
<h1>
  Connect with
  <br />
  Your Local
  <br />
  <span>Community</span>
</h1>
<p>
  Discover nearby communities, join local events,
  meet like-minded people, and build meaningful
  real-world connections—all in one place.
</p>
          <div className="hero-buttons">

          <button
  className="primary-btn"
  onClick={() => navigate("/signup")}
>
  Get Started
  <ArrowRight size={18} />
</button>

            <button className="secondary-btn">
              Explore Communities
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="hero-right">

          <div className="app-window">

            <div className="window-header">

              <div className="window-dots">
                <span className="red"></span>
                <span className="yellow"></span>
                <span className="green"></span>
              </div>

              <p>SyncRadius Dashboard</p>

            </div>

            <div className="dashboard">

              {/* CARD */}

              <div className="dashboard-card">

                <div className="card-header">

                  <h4>Nearby Communities</h4>

                  <button>
                    View All
                  </button>

                </div>

                {/* Community */}

                <div className="community">

                  <div>

                    <h5>
                      <Users size={18}/>
                      Chandigarh Developers
                    </h5>

                    <span>
                      1.2K Members
                    </span>

                  </div>

                  <button className="join-btn">
                    Join
                  </button>

                </div>

                <div className="community">

                  <div>

                    <h5>
                      <Users size={18}/>
                      AI Learners
                    </h5>

                    <span>
                      850 Members
                    </span>

                  </div>

                  <button className="joined-btn">
                    Joined
                  </button>

                </div>

              

              </div>

              {/* Bottom */}

              <div className="bottom-grid">

                <div className="mini-card">

                  <h4>

                    <Calendar size={18}/>

                    Upcoming Event

                  </h4>

                  <h5>
                    Weekend Trek
                  </h5>

                  <p>

                    <MapPin size={16}/>

                    Morni Hills

                  </p>

                  <p>
                    Tomorrow • 5:30 PM
                  </p>

                </div>

                <div className="mini-card">

                 

                  <ul>

                    <li>✓ 24 Members Online</li>

                    <li>✓ 8 New Posts</li>

                    <li>✓ 3 Join Requests</li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;