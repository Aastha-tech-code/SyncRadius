import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  // Form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // FastAPI OAuth2 login expects form-urlencoded data
      const formData = new URLSearchParams();

      formData.append("username", username.trim());
      formData.append("password", password);

      const response = await fetch(
        "http://127.0.0.1:8000/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          body: formData,
        }
      );

      const data = await response.json();

      // Invalid login
      if (!response.ok) {
        if (typeof data.detail === "string") {
          setError(data.detail);
        } else {
          setError("Login failed. Please try again.");
        }

        return;
      }

      // Save JWT token
      localStorage.setItem("access_token", data.access_token);

      // Optional token type
      if (data.token_type) {
        localStorage.setItem("token_type", data.token_type);
      }

      alert("Login successful!");

      // Temporary destination
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}

        <div className="login-left">

          <div className="login-brand">

            <span className="login-brand-icon">
              S
            </span>

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

            <p>
              Login to continue to SyncRadius.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* USERNAME */}

            <div className="login-form-group">

              <label>Username</label>

              <div className="login-input-box">

                <Mail size={19} />

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <label>Password</label>

              <div className="login-input-box">

                <Lock size={19} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember-me">

                <input type="checkbox" />

                Remember me

              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>

            </div>


            {/* ERROR */}

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginBottom: "14px",
                }}
              >
                {error}
              </p>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login"
              }

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* SIGNUP */}

          <p className="signup-link">

            Don't have an account?

            <button
              type="button"
              onClick={() =>
                navigate("/signup")
              }
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