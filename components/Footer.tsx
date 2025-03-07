"use client";

const footerLinks = {
  chat: [
    { label: "Chat", path: "/chat" },
    { label: "Forum", path: "/forum" },
    { label: "Contribute", path: "/drive" },
  ],
  connect: [
    { label: "Leadership", path: "/community" },
    { label: "Contact", path: "/prototyping" },
  ],
  resources: [{ label: "Folders", path: "/resources" }],
};

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-10 text-white">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h5 className="font-bold">Use cases</h5>
          <ul>
            {footerLinks.chat.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Explore</h5>
          <ul>
            {footerLinks.connect.map((link, index) => (
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
