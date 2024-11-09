import NavBar from "../components/NavBar";
import Hero from "@/components/Hero";
import ToolkitLink from "@/components/ToolkitLink";
import Footer from "../components/Footer";

const toolkitLinks = [
  {
    title: "Getting Started",
    description: "Getting Started - Key Information for Managers",
  },
  {
    title: "Academic and Faculty Affairs",
    description: "Academic and Faculty Affairs",
  },
  { title: "Academic Planning", description: "Academic Planning" },
  { title: "Business and Finance", description: "Business and Finance" },
  {
    title: "Project and Change Management",
    description: "Project and Change Management",
  },
  {
    title: "Instructional Resilience and COVID-19",
    description: "Instructional Resilience and COVID-19",
  },
];

export default function Home() {
  return (
    <section>
      <NavBar />
      <Hero />
      <div className="p-12">
        <h1 className="mb-2 text-4xl font-bold text-blue-800">
          Toolkit Directory
        </h1>
        <p className="underline">READ ME - An Orientation to the toolkit</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolkitLinks.map((link, index) => (
            <ToolkitLink
              key={index}
              title={link.title}
              description={link.description}
            />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}
