import {
  FileUp,
  BarChart3,
  Users,
  ShieldCheck,
  Lock,
  History,
  UserCog,
  FileText,
} from "lucide-react";

const features = [
  {
    title: "Upload Excel Files",
    description: "Easily upload and manage your Excel spreadsheets.",
    icon: FileUp,
  },
  {
    title: "Visualize Data",
    description: "Generate dynamic charts and graphs from your data.",
    icon: BarChart3,
  },
  {
    title: "Real-time Collaboration",
    description: "Collaborate with team members instantly.",
    icon: Users,
  },
  {
    title: "Role-based Access",
    description: "Assign specific permissions to users based on roles.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Login",
    description: "Authenticate safely with JWT and Google OAuth.",
    icon: Lock,
  },
  {
    title: "History Tracking",
    description: "Track file and user activity over time.",
    icon: History,
  },
  {
    title: "Contributor Control",
    description: "Manage who can edit or view content.",
    icon: UserCog,
  },
  {
    title: "Export Reports",
    description: "Download professional reports in various formats.",
    icon: FileText,
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block bg-gray-800 text-sm px-4 py-1 rounded-full mb-4 font-medium">
          Features
        </div>
        <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Discover the core features that make our Excel-based analytics and
          user management platform powerful and efficient.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-indigo-500 transition-all duration-300 hover:scale-109"
              >
                <div className="bg-indigo-600/10 text-indigo-400 p-3 inline-flex rounded-md mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
