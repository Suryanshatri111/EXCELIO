import { Link as ScrollLink } from "react-scroll";

const NavBar = () => {
  return (
    <div className="fixed w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 bg-black/60 backdrop-blur-sm rounded-b-lg  border-gray-800">
        <div className="flex items-center justify-between text-white h-20">
          <h1 className="text-3xl font-bold tracking-wider">ChartCraft</h1>
          <ul className="flex gap-6 text-sm md:text-lg font-medium ">
            <li className="hover:cursor-pointer hover:scale-105 hover:border-b-2 ">
              <ScrollLink
                to="/"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                Home
              </ScrollLink>
            </li>
            <li className="hover:cursor-pointer hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                Features
              </ScrollLink>
            </li>
            <li className="hover:cursor-pointer hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                About
              </ScrollLink>
            </li>
            <li className="hover:cursor-pointer hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                Contact
              </ScrollLink>
            </li>
            {/* // there some error need to  file */}
            <li className="hover:cursor-pointer hover:scale-105 hover:border-b-2">
              <a
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
