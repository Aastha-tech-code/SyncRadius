import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">

          <div className="login-brand">
            <span className="login-brand-icon">S</span>
            <h2>SyncRadius</h2>
          </div>

          <h1>
            Welcome Back to
            <span> Your Community</span>
          </h1>

          <p>
            Login to discover communities, join local events,
            and stay connected with people around you.
          </p>

          <div className="login-benefits">
            <p>✓ Discover nearby communities</p>
            <p>✓ Stay updated with local events</p>
            <p>✓ Connect and collaborate with members</p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-card">

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Login to continue to SyncRadius.</p>
          </div>

          <form>

            <div className="login-form-group">
              <label>Email Address</label>

              <div className="login-input-box">
                <Mail size={19} />

                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label>Password</label>

              <div className="login-input-box">
                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="login-submit-btn">
              Login
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="signup-link">
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;