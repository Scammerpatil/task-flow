"use client";

const About = () => {
  return (
    <div className="bg-base-300 p-10 text-base-content space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-base-content/70 text-lg">
          Empowering Teams with Real-Time Collaboration
        </p>
      </div>

      {/* Mission */}
      <section className="bg-base-200 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-base-content/80 leading-relaxed">
          We’re building a fast, intuitive, and secure team chat system that
          helps teams collaborate effectively, no matter where they are. Our
          mission is to bring teams closer with seamless communication, powerful
          features, and a user-friendly interface.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {[
            { name: "Ravi Kumar", role: "Full Stack Developer" },
            { name: "Anjali Patel", role: "UI/UX Designer" },
            { name: "Mohit Singh", role: "Backend Engineer" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-base-200 p-4 rounded-lg shadow text-center"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${i + 11}`}
                alt={member.name}
                className="mx-auto mb-3 w-20 h-20 rounded-full"
              />
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-sm text-base-content/60">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-base-200 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-1 text-base-content/80">
          <li>Frontend: React + Next.js + Tailwind CSS + DaisyUI</li>
          <li>Backend: Node.js, Express, and MongoDB</li>
          <li>Authentication & Security: JWT and bcrypt</li>
          <li>Real-Time Messaging (Planned): WebSockets / Socket.IO</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
