import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  AtSign,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Message / loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Password check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (typeof data.detail === "string") {
          setError(data.detail);
        } else {
          setError("Registration failed. Please check your details.");
        }

        return;
      }

      // Registration successful
      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-container">

        {/* LEFT SIDE */}

        <div className="signup-left">

          <div className="signup-brand">

            <span className="brand-icon">
              S
            </span>

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

            <p>
              Start your SyncRadius journey today.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}

            <div className="form-group">

              <label>Full Name</label>

              <div className="input-box">

                <User size={19} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>

            </div>


            {/* USERNAME */}

            <div className="form-group">

              <label>Username</label>

              <div className="input-box">

                <AtSign size={19} />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />

              </div>

            </div>


            {/* ERROR MESSAGE */}

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                {error}
              </p>
            )}


            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"
              }

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* LOGIN */}

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