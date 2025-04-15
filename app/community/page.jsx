import React from "react";
import "./CommunityPage.css";

const CommunityPage = () => {
  const researchers = [
    {
      id: 1,
      name: "David Lindeman, Ph.D.",
      profile: "https://citris-uc.org/people/person/david-lindeman/",
      research: [
        "Healthcare technology",
        "Healthy aging",
        "Hospital management",
      ],
      engagement: [
        "Commission Chair, California Commission on Aging (https://ccoa.ca.gov/AboutCCoA/Commissioners/)",
      ],
    },
    {
      id: 2,
      name: "Eva Harris, Ph.D.",
      profile: "https://publichealth.berkeley.edu/people/eva-harris",
      research: [
        "Molecular virology, pathogenesis, immunology, epidemiology, clinical aspects and control of dengue, Zika, and chikungunya",
        "Epidemiology of influenza and COVID-19 in tropical countries",
        "Scientific capacity building in developing countries",
      ],
      engagement: [
        "President, Sustainable Sciences Institute (https://www.sustainablesciences.org/)",
      ],
    },
    {
      id: 3,
      name: "Vinod Aggarwal, Ph.D.",
      profile: "https://polisci.berkeley.edu/people/person/vinod-k-aggarwal",
      research: [
        "International Political Economy",
        "Comparative Regionalism",
        "Business and Politics",
      ],
      engagement: [
        "Consultant to multinational corporations on strategy, trade policy, and international negotiations",
        "Consultant to Mexican government, Malaysian government, U.S. Department of Commerce, U.S. Defense Department, U.S. State Department, World Trade Organization, OECD, the Group of Thirty, FAO, IFAD, the International Labor Organization, ASEAN, and the World Bank",
      ],
    },
  ];

  const aiResources = [
    {
      id: 1,
      name: "BearGPT",
      link: "https://beargpt.berkeley.edu/chat",
      description: "UC Berkeley's AI chatbot service",
    },
    {
      id: 2,
      name: "Licensed Generative AI Tools",
      link: "https://technology.berkeley.edu/ai-resources/licensed-generative-ai-tools",
      description: "Official AI tools licensed for use at UC Berkeley",
    },
    {
      id: 3,
      name: "Data Classification and Protection Levels",
      link: "https://security.berkeley.edu/policy/data-classification-standard/data-classification-and-protection-levels",
      description:
        "Guidelines for data security and classification at UC Berkeley",
    },
  ];

  return (
    <div className="community-container">
      <h1 className="community-title">UC Berkeley AMP Community</h1>
      <div className="community-quote">
        <blockquote>
          &ldquo;UC Berkeley is the Social Mobility Accelerator, and AMP and its
          toolkit is one of the pilot asset-based engines!&rdquo;
          <footer>– Chancellor Lyons</footer>
        </blockquote>
      </div>

      <div className="community-section">
        <h2 className="community-subtitle">Research Community</h2>
        <p className="community-description">
          Connect with UC Berkeley researchers who are making an impact through
          their work and community engagement.
        </p>

        <div className="community-members">
          {researchers.map((researcher) => (
            <div key={researcher.id} className="community-member">
              <h3>{researcher.name}</h3>
              <p>
                <a
                  href={researcher.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </p>

              <h4>Research Interests:</h4>
              <ul>
                {researcher.research.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h4>Community Engagement:</h4>
              <ul>
                {researcher.engagement.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="community-section">
        <h2 className="community-subtitle">Research Resources</h2>
        <p className="community-description">
          Find UC Berkeley Faculty through the{" "}
          <a
            href="https://vcresearch.berkeley.edu/faculty-expertise"
            target="_blank"
            rel="noopener noreferrer"
          >
            Faculty Expertise Database
          </a>{" "}
          or connect with{" "}
          <a
            href="https://citris-uc.org/people/role/researcher/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Researchers at CITRS
          </a>
          .
        </p>

        <h3>Community Engaged Research</h3>
        <p>
          Learn more about community engaged research through the{" "}
          <a
            href="https://ofew.berkeley.edu/topics/community-engaged-research"
            target="_blank"
            rel="noopener noreferrer"
          >
            Office for Faculty Equity & Welfare
          </a>
          .
        </p>

        <h3>Research Categories</h3>
        <ul className="research-categories">
          <li>Cutting-edge/new research</li>
          <li>Community engaged research</li>
          <li>Expecting/new parents</li>
          <li>Grants</li>
          <li>Mentoring students</li>
          <li>Time management</li>
          <li>Networks/networking</li>
          <li>DEIB work</li>
          <li>Department interactions</li>
          <li>Invisible contributions</li>
          <li>Work/family/community balance</li>
        </ul>
      </div>

      <div className="community-section">
        <h2 className="community-subtitle">AI Resources</h2>
        <div className="ai-resources">
          {aiResources.map((resource) => (
            <div key={resource.id} className="ai-resource">
              <h3>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </h3>
              <p>{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
