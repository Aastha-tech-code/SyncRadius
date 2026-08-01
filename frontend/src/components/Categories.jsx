import "../styles/Categories.css";

import {
  Code2,
  HeartHandshake,
  Dumbbell,
  BookOpen,
  Briefcase,
  Palette,
} from "lucide-react";

const categories = [
  {
    icon: <Code2 size={40} />,
    title: "Technology",
  },
  {
    icon: <HeartHandshake size={40} />,
    title: "Volunteering",
  },
  {
    icon: <Dumbbell size={40} />,
    title: "Fitness",
  },
  {
    icon: <BookOpen size={40} />,
    title: "Education",
  },
  {
    icon: <Briefcase size={40} />,
    title: "Professional",
  },
  {
    icon: <Palette size={40} />,
    title: "Arts & Culture",
  },
];

function Categories() {
  return (
    <section className="categories">

      <div className="categories-container">

        <span className="section-tag">
          CATEGORIES
        </span>

        <h2>
          Find Communities
          <span> That Match Your Interests</span>
        </h2>

        <p className="section-description">
          Explore different categories and discover
          communities that inspire learning,
          collaboration and meaningful connections.
        </p>

        <div className="categories-grid">

          {categories.map((category, index) => (

            <div className="category-card" key={index}>

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.title}</h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;