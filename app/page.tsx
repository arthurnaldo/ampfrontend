import Hero from "@/components/Hero";
import ToolkitLink from "@/components/ToolkitLink";
import Footer from "../components/Footer";
import Chatbot from "@/components/chatbot";

const toolkitLinks = [
  {
    title: "Getting Started",
    description: "Getting Started - Key Information for Managers",
    href: "https://docs.google.com/document/d/15wt60NsQVQjSlAiCc7T27swZw7tQuw8aw8mQaILvGdg/edit?tab=t.0",
  },
  {
    title: "Academic and Faculty Affairs",
    description: "Academic and Faculty Affairs",
    href: "https://docs.google.com/document/d/1aDK9baHFomFdnPEujrIZFWeKpQMB0Me1R0GLCvayC0Q/edit?tab=t.0",
  },
  {
    title: "Academic Planning",
    description: "Academic Planning",
    href: "https://drive.google.com/drive/folders/14V_9YtLgZEcU2vxLzoSjkxQS8TgahzBb",
  },
  {
    title: "Business and Finance",
    description: "Business and Finance",
    href: "https://docs.google.com/document/d/1eW0VnGfX0GOy2OIXdBA_xCJOUeeML7zptcdg4d3G0hw/edit?tab=t.0",
  },
  {
    title: "Project and Change Management",
    description: "Project and Change Management",
    href: "https://docs.google.com/document/d/1qDZrBNQuNhIl11RaFmbLws9UX43SVTFH-sK70Lun2bU/edit?tab=t.0",
  },
  {
    title: "Instructional Resilience and COVID-19",
    description: "Instructional Resilience and COVID-19",
    href: "https://drive.google.com/drive/folders/1Pr8ixjo6yBdFH2Cr52SfrSwB8G_nm370",
  },
];

export default function Home() {
  return (
    <section>
      <Hero />
      <div className="p-12">
        <h1 className="mb-2 text-4xl font-bold text-blue-800">
          Toolkit Directory
        </h1>
        <a
          href="https://docs.google.com/document/d/15wt60NsQVQjSlAiCc7T27swZw7tQuw8aw8mQaILvGdg/edit?tab=t.0"
          className="underline"
        >
          READ ME - An Orientation to the toolkit
        </a>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolkitLinks.map((link, index) => (
            <ToolkitLink
              key={index}
              title={link.title}
              description={link.description}
              href={link.href}
            />
          ))}
        </div>
      </div>
      <Chatbot />
      <Footer />
    </section>
  );
}
