import "../styles/CTA.css";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="cta">

      <div className="cta-container">

        <span className="section-tag">
          JOIN TODAY
        </span>

        <h2>
          Build Meaningful
          <span> Connections Around You</span>
        </h2>

        <p>
          Discover communities, attend events and connect
          with people who share your interests. Your next
          opportunity is just one click away.
        </p>

        <div className="cta-buttons">

          <button className="primary-btn">
            Get Started
            <ArrowRight size={20}/>
          </button>

          <button className="secondary-btn">
            Explore Communities
          </button>

        </div>

      </div>

    </section>
  );
}

export default CTA;