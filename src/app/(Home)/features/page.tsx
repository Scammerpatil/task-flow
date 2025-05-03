"use client";

const features = [
  {
    title: "Real-Time Team Chat",
    description:
      "Collaborate with your team instantly using our secure, real-time chat system with message history and notifications.",
    icon: "💬",
  },
  {
    title: "Smart Dashboard",
    description:
      "Stay organized with a user-friendly dashboard that gives quick access to tasks, chats, and team updates.",
    icon: "📊",
  },
  {
    title: "File Sharing",
    description:
      "Upload and share documents, images, and important files securely with your team members.",
    icon: "📁",
  },
  {
    title: "Multi-Team Support",
    description:
      "Create and manage multiple teams or groups with dedicated workspaces and custom roles.",
    icon: "👥",
  },
  {
    title: "Cross-Platform Access",
    description:
      "Access your account from desktop, tablet, or mobile – your work is always with you.",
    icon: "🌐",
  },
  {
    title: "Data Security",
    description:
      "All communication and files are encrypted using industry-standard security protocols.",
    icon: "🔐",
  },
];

const Features = () => {
  return (
    <div className="bg-base-300 p-10 text-base-content space-y-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Powerful Features</h1>
        <p className="text-base-content/70 text-lg">
          Designed to simplify collaboration and enhance productivity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-base-200 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-base-content/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
