import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="signup-page">

      <div className="signup-container">

        {/* LEFT SIDE */}
        <div className="signup-left">

          <div className="signup-brand">
            <span className="brand-icon">S</span>
            <h2>SyncRadius</h2>
          </div>

          <h1>
            Join Your
            <span> Local Community</span>
          </h1>

          <p>
            Create your account and start discovering communities,
            events and people around you.
          </p>

          <div className="signup-benefits">
            <p>✓ Discover nearby communities</p>
            <p>✓ Join local events and activities</p>
            <p>✓ Connect with like-minded people</p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="signup-card">

          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Start your SyncRadius journey today.</p>
          </div>

          <form>

            {/* FULL NAME */}
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-box">
                <User size={19} />

                <input
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-box">
                <Mail size={19} />

                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>

              <div className="input-box">
                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-box">
                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              className="signup-btn"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="login-link">
            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;