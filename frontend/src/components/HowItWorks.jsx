import "../styles/HowItWorks.css";

import {
  Search,
  Users,
  CalendarDays,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: <Search size={40} />,
    title: "Discover Communities",
    description:
      "Search nearby communities based on your interests, hobbies and location.",
  },

  {
    icon: <Users size={40} />,
    title: "Join & Connect",
    description:
      "Become a member, interact with people and grow your local network.",
  },

  {
    icon: <CalendarDays size={40} />,
    title: "Participate in Events",
    description:
      "Attend activities, workshops and community events happening around you.",
  },

  {
    icon: <Trophy size={40} />,
    title: "Earn Recognition",
    description:
      "Complete activities, contribute to communities and unlock achievements.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-container">

        <span className="section-tag">
          HOW IT WORKS
        </span>

        <h2>
          Join Communities In
          <span> Four Simple Steps</span>
        </h2>

        <p className="section-description">
          SyncRadius makes discovering communities,
          participating in events and building meaningful
          local connections simple and enjoyable.
        </p>

        <div className="steps-grid">

          {steps.map((step, index) => (
            <div className="step-card" key={index}>

              <div className="step-number">
                0{index + 1}
              </div>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;