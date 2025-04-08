import React from "react";
import "./CommunityPage.css"; // Assuming you have a CSS file for styles

const councilMembers = [
  {
    name: "Cruz Grimaldo",
    title: "Chair",
    position:
      "Associate Vice Chancellor Financial Aid and Scholarships & Cal Student Central",
    email: "ma_cruz@berkeley.edu",
  },
  {
    name: "Emily Best",
    title: "Chair Elect",
    position: "Assistant Director, Robbins Collection, Berkeley Law",
    email: "ebest@law.berkeley.edu",
  },
  {
    name: "Joanne Straley",
    title: "Past Chair",
    position: "Manager, Plant & Microbial Biology",
    email: "jstraley@berkeley.edu",
  },
  {
    name: "Barbara Montano",
    title: "Events & Special Programs Committee",
    position: "Project Manager, African American Studies",
    email: "bmontano14@berkeley.edu",
  },
  {
    name: "Jolie Lam",
    title: "Manager Toolkit Coordinator",
    position:
      "Manager, Surgical Robotics and Health Informatics Research & Training Program, CITRIS and the Banatao Institute",
    email: "jolie.lam@citris-uc.org",
  },
  {
    name: "Angela Chang",
    title: "Systemwide Representative",
    position: "Financial Analyst for VC Administration",
    email: "changa99@berkeley.edu",
  },
  {
    name: "Jan Crosbie-Taylor",
    title: "Events & Special Programs Committee",
    position:
      "Assistant Director of Foundational Skills Development, People & Culture",
    email: "j.crosbie-taylor@berkeley.edu",
  },
  {
    name: "Latara Harris",
    title: "Treasurer & Systemwide Representative",
    position: "Manager Business Operations, Procurement, & Onboarding, ProS",
    email: "latara_harris@berkeley.edu",
  },
  {
    name: "Nicole Lowy",
    title: "Communication & Membership Records Manager",
    position: "Department Manager, Environmental Science, Policy & Management",
    email: "nlowy@berkeley.edu",
  },
  {
    name: "Sandra Richmond",
    title: "Systemwide Representative",
    position: "Director of Administration, AGES, Social Science Cluster",
    email: "sandyjbr@berkeley.edu",
  },
  {
    name: "Harumi Quinones",
    title: "Events & Special Programs Committee",
    position: "Director of Student Services, Department of Psychology",
    email: "harumi@berkeley.edu",
  },
  {
    name: "Elena Wen Jiang",
    title: "Events & Special Programs Committee",
    position:
      "Chief Financial Officer (Admin Division), Admin & Finance Immediate Office",
    email: "wjiang@berkeley.edu",
  },
];

const CommunityPage = () => {
  return (
    <div className="community-container">
      <h1 className="community-title">Leadership</h1>
      <h2 className="community-subtitle">Berkeley AMP Management Council</h2>
      <p className="community-description">
        There are eight to twelve council members consisting of four officers
        (Chair, Chair-elect, and two Systemwide Representatives), and at least
        four additional appointed council members. The officers invite members
        to serve as positions become available. This process typically occurs
        near the end of the service year and will be effective the following
        year. Each of the council members will serve for a two-year term
        beginning July 1 with a possibility of reappointment for an additional
        year.
      </p>
      <p className="community-description">
        Members are eligible for election to Chair-elect, or appointment to
        Systemwide Representative, with preference for Management Council
        members who have completed at least one year of service. Any council
        member who becomes an officer will remain on Management Council for the
        duration of service in that capacity. In appointing the members of the
        Management Council, an attempt shall be made to reflect the diversity of
        the campus.
      </p>
      <p className="community-description">
        Interested in joining AMP Management Council? Please email or contact
        one of the Management Council members below to learn more. Members also
        may nominate candidates and vote in the annual election of new members
        to the AMP Management Council. Nominations may be sent to{" "}
        <a href="mailto:berkeleyamp@berkeley.edu">berkeleyamp@berkeley.edu</a>.
      </p>
      <h2 className="community-title">2024-25 Management Council Members</h2>
      <div className="community-members">
        {councilMembers.map((member, index) => (
          <div key={index} className="community-member">
            <h3>{member.name}</h3>
            <p>{member.title}</p>
            <p>{member.position}</p>
            <p>
              Email: <a href={`mailto:${member.email}`}>{member.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
