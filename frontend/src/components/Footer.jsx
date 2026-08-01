import "../styles/Footer.css";



function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h2>SyncRadius</h2>

          <p>
            Connecting communities, inspiring
            collaboration and making local
            engagement easier than ever.
          </p>

        </div>

        <div className="footer-links">

          <div>

            <h4>Product</h4>

            <a href="#">Features</a>
            <a href="#">Communities</a>
            <a href="#">Events</a>

          </div>

          <div>

            <h4>Company</h4>

            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>

          </div>

          <div>

            <h4>Follow Us</h4>
<div>

  <h4>Contact</h4>

  <p>Email: support@syncradius.com</p>

</div>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 SyncRadius. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;