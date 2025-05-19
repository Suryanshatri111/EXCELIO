import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/usersApi";
import { setCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(`⚠️ ${err?.data?.message || err.error}`);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center gap-20 min-h-screen px-20 text-white relative z-50">
      <div
        className=" absolute w-full h-screen -z-50 "
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a8953, #1f7348, #205d3d, #204932, #1d3527, #182b23, #14221e, #121817, #0f1415, #0c0f11, #08090b, #030303)",
        }}
      ></div>
      <div className="w-1/3 bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-1">
          Sign Up
        </h1>
        <p className="text-md font-medium text-gray-200 text-center mb-6">
          Create an account to get started
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-100"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none text-white bg-transparent placeholder-gray-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none text-white bg-transparent placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="relative space-y-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none text-white bg-transparent placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-5 top-12 text-gray-300 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative space-y-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-100"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none text-white bg-transparent placeholder-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-5 top-12 text-gray-300 hover:text-white"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-center">
            <p className="text-md text-gray-100">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:underline font-bold"
              >
                Sign In
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin text-white" />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
      {/* //todo add something */}
      <div className="w-1/2">
        <div className="w-3/4 mx-auto min-h-[50%] bg-green-500 rounded-tr-4xl">
          <div className="p-15">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            assumenda nemo architecto cumque voluptates dignissimos odit
            ratione, ad dicta ipsum et fugit, iure nulla totam aliquam, enim
            voluptas pariatur possimus? Sit ex at laudantium nemo! Quasi ullam
            quis iste, adipisci, quibusdam illo ab, modi perspiciatis \
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
