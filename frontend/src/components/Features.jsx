import "../styles/Features.css";

import {
  Users,
  MapPin,
  CalendarDays,
  ShieldCheck,
  MessageCircle,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: <Users size={42} />,
    title: "Community Discovery",
    description:
      "Find nearby communities based on your interests, location and activities."
  },

  {
    icon: <MapPin size={42} />,
    title: "Location Based",
    description:
      "Explore events and groups happening around your city with smart recommendations."
  },

  {
    icon: <CalendarDays size={42} />,
    title: "Event Management",
    description:
      "Create, manage and participate in local events with reminders and schedules."
  },

  {
    icon: <ShieldCheck size={42} />,
    title: "Safe & Verified",
    description:
      "Verified communities and secure authentication keep every member protected."
  },

  {
    icon: <MessageCircle size={42} />,
    title: "Real-time Collaboration",
    description:
      "Stay connected through discussions, updates and instant community interactions."
  },

  {
    icon: <Trophy size={42} />,
    title: "Achievements",
    description:
      "Earn badges, complete activities and grow your reputation within communities."
  }
];

function Features() {
  return (
    <section className="features">

      <div className="features-container">

        <span className="section-tag">
          WHY SYNCRADIUS
        </span>

        <h2>
          Everything You Need
          <span> To Build Strong Communities</span>
        </h2>

        <p className="section-description">
          SyncRadius combines community discovery,
          event management, collaboration and networking
          into one modern platform designed for meaningful
          real-world connections.
        </p>

        <div className="features-grid">

          {features.map((feature, index) => (

            <div
              className="feature-card"
              key={index}
            >

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.description}
              </p>



            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;