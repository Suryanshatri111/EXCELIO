import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center bg-black text-white px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Unlock Insights from Your Excel Data
          </h2>
          <p className="text-lg text-gray-400">
            Analyze, visualize, and collaborate on Excel uploads. Save time and
            make smarter decisions with our powerful analytics platform.
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Explore More
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src="https://www.webfactoryltd.com/wp-content/uploads/2021/07/person-making-charts-on-laptop.jpg"
            alt="Charts Visualization"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
