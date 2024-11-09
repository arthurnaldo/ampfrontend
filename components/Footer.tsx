"use client";

const footerLinks = {
  useCases: [
    { label: "UI design", path: "/ui-design" },
    { label: "UX design", path: "/ux-design" },
    { label: "Wireframing", path: "/wireframing" },
  ],
  explore: [
    { label: "Design", path: "/design" },
    { label: "Prototyping", path: "/prototyping" },
  ],
  resources: [
    { label: "Blog", path: "/blog" },
    { label: "Best practices", path: "/best-practices" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-10 text-white">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h5 className="font-bold">Use cases</h5>
          <ul>
            {footerLinks.useCases.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Explore</h5>
          <ul>
            {footerLinks.explore.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Resources</h5>
          <ul>
            {footerLinks.resources.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
