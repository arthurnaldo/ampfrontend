import React from "react";
import "./ResourcesPage.css"; // Assuming you have a CSS file for styles

const resources = [
  {
    id: 1,
    title: "READ ME - An orientation to the Toolkit",
    link: "https://drive.google.com/drive/folders/1CbtIwLPqFw6TG2nQ2t1Cc-tpd0qgpqlv?usp=sharing",
  },
  {
    id: 2,
    title: "Getting Started - Key Information for Managers",
    link: "https://drive.google.com/drive/folders/1AXc4ZUYun8AwPZMfKieDgFjYMxjLXJiY?usp=sharing",
  },
  {
    id: 3,
    title: "Academic and Faculty Affairs",
    link: "https://drive.google.com/drive/folders/1mN5JJ53YKRoEWSSmgTAMPcfIF_GbDfMA?usp=sharing",
  },
  {
    id: 4,
    title: "Academic Planning",
    link: "https://drive.google.com/drive/folders/14V_9YtLgZEcU2vxLzoSjkxQS8TgahzBb?usp=sharing",
  },
  {
    id: 5,
    title: "Business and Finance",
    link: "https://drive.google.com/drive/folders/1oQQ9k9VVFUypRpLENuZJQEePkJTPhruA?usp=sharing",
  },
  {
    id: 6,
    title: "Project and Change Management",
    link: "https://drive.google.com/drive/folders/1fELPJL4oaR4O-4YRgJU5MUKS_xlykOi3?usp=sharing",
  },
  {
    id: 7,
    title: "Instructional Resilience",
    link: "https://drive.google.com/drive/folders/1Pr8ixjo6yBdFH2Cr52SfrSwB8G_nm370?usp=sharing",
  },
  {
    id: 8,
    title: "Development, Communications, & Alumni Relations",
    link: "https://drive.google.com/drive/folders/1s4Y7c8RjBS12vQ1wOU2QvE2JtfZnpbip?usp=sharing",
  },
  {
    id: 9,
    title: "Diversity, Equity, and Inclusion",
    link: "https://drive.google.com/drive/folders/1qOtZGUUYpZ0l555KAel9N5-Pdc_dWpG0?usp=sharing",
  },
  {
    id: 10,
    title: "Emergency Information and Contacts",
    link: "https://drive.google.com/drive/folders/1O5TAMn3XCVxYl7yFIU5dsrMx98FNYSC1?usp=sharing",
  },
  {
    id: 11,
    title: "Environmental Health and Safety",
    link: "https://drive.google.com/drive/folders/1CQYNd-DC5pHxEd0QDp61vXACf6ZYFPRe?usp=sharing",
  },
  {
    id: 12,
    title: "Facilities, Space, Transportation, & Parking",
    link: "https://drive.google.com/drive/folders/1ckQu20pn2ux5fXis9hh5Z4JFtrVSjyH6?usp=sharing",
  },
  {
    id: 13,
    title: "Graduate Education & Student Employment",
    link: "https://drive.google.com/drive/folders/1yhxSBLs9nAfyuYKt74J_Kx_7RcQjFhnB?usp=sharing",
  },
  {
    id: 14,
    title: "Information Technology",
    link: "https://drive.google.com/drive/folders/1SMqmxmxo3lCxE9dpOkzFaIuw_RKNQuYl?usp=sharing",
  },
  {
    id: 15,
    title: "Human Resources - People & Culture",
    link: "https://drive.google.com/drive/folders/13Ig2MX4iweOuLUeRNrgUIzr14j1Yb0f-?usp=sharing",
  },
  {
    id: 16,
    title: "Research Administration",
    link: "https://drive.google.com/drive/folders/1J2DFCPFvbP8RN8vwbO4_-vjLG3HxhOkp?usp=sharing",
  },
  {
    id: 17,
    title: "Student Affairs",
    link: "https://drive.google.com/drive/folders/11v8o-qIH5iJuVAOJaq6tl-tv0JdZ59Q3?usp=sharing",
  },
  {
    id: 18,
    title: "Teaching and Student Learning",
    link: "https://drive.google.com/drive/folders/1IyElhMHjh_YvTU7RuJ5GuGSOgpvjufW9?usp=sharing",
  },
  {
    id: 19,
    title: "University of California & Regents Policies",
    link: "https://drive.google.com/drive/folders/179Xs3Z1uLMndO3iDgTD7C4KBTnki-Y_L?usp=sharing",
  },
  {
    id: 20,
    title: "Manager Annual Calendar",
    link: "https://docs.google.com/spreadsheets/d/1l5FMAv9XSI2sco7Wk2KSD62LDkkdDkJBDTwcaRn1tso/edit?usp=sharing",
  },
];

const ResourcesPage = () => {
  return (
    <div className="resources-container">
      <h1 className="resources-title">
        UC Berkeley Manager Toolkit - Folder Directory
      </h1>
      <h2 className="resources-subtitle">UC Berkeley Manager Toolkit</h2>
      <div className="resources-grid">
        {resources.map((resource) => (
          <a key={resource.id} href={resource.link} className="resource-item">
            {resource.id}. {resource.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
