import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useSigninMutation,
  useOauthLoginUserMutation,
} from "../../redux/api/usersApi";
import { setCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import {
  FaGithub,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaApple,
} from "react-icons/fa6";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../../libs/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useSigninMutation();
  const [oauthLoginUser] = useOauthLoginUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res, rememberMe }));
      navigate("/user-profile");
      console.log("This remember me", rememberMe);
    } catch (err) {
      toast.error(`⚠️ ${err?.data?.message || err.error}`);
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseIdToken = await result.user.getIdToken();

      // send token to backend
      const response = await oauthLoginUser({ firebaseIdToken }).unwrap();
      dispatch(setCredentials(response));
      navigate("/user-profile");
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const firebaseIdToken = await result.user.getIdToken();

      // send token to backend
      const response = await oauthLoginUser({ firebaseIdToken }).unwrap();
      dispatch(setCredentials(response));
      navigate("/user-dashboard");
    } catch (error) {
      console.error("GitHub login failed", error);
      toast.error("GitHub login failed");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-20 gap-30 text-white  relative z-10  ">
      <div
        className=" absolute w-full h-screen -z-50 "
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a8953, #1f7348, #205d3d, #204932, #1d3527, #182b23, #14221e, #121817, #0f1415, #0c0f11, #08090b, #030303)",
        }}
      ></div>
      <div className="w-full md:w-1/3  bg-white/10 backdrop:backdrop-none   p-6  rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-1">
          Sign In
        </h1>
        <p className="text-md font-medium text-gray-200 text-center mb-6">
          Welcome back! Please log in to continue.
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none text-white bg-transparent placeholder-gray-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none text-white bg-transparent placeholder-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-6 top-11 text-gray-300 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className=" ml-5 mr-2 "
              />
              <label htmlFor="rememberMe" className="text-md text-gray-100">
                Remember Me
              </label>
            </div>
            {/* //todo need to add forgetpassword */}
            <h2>
              <Link
                to={"/send-mail"}
                className="text-gray-300 hover:text-gray-50 hover:underline font-medium"
              >
                Forgot Password
              </Link>
            </h2>
          </div>

          {/*  //! if we need forgot password we can add it here */}
          <div className="text-center">
            <p className="text-md text-gray-100">
              New Customer?{" "}
              <Link
                to={"/signup"}
                className="hover:underline hover:text-green-500"
              >
                <span className="text-lg text-green-600 font-bold">
                  {" "}
                  Register
                </span>
              </Link>
            </p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed  "
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin text-white" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <hr className="text-gray-400" />
          <p className="text-center">Or</p>
          <div className="flex justify-center gap-x-10">
            <h2
              className="flex gap-2 p-3 cursor-pointer hover:scale-105 hover:bg-white hover:text-black rounded-3xl"
              onClick={handleGitHubLogin}
            >
              <span>
                <FaGithub size={26} className="text-gray-500" />
              </span>
              Git Hub
            </h2>
            <h2
              className="flex gap-2 p-3 cursor-pointer hover:scale-105 hover:bg-white hover:text-black rounded-3xl"
              onClick={handleGoogleLogin}
            >
              <span>
                <FaGoogle size={26} className="text-red-600 " />
              </span>
              Google
            </h2>
            <h2 className="flex gap-2 p-3 cursor-pointer hover:scale-105 hover:bg-gray-500 hover:text-black rounded-3xl">
              <FaApple className="text-white " size={26} />
              <span>Apple</span>
            </h2>{" "}
          </div>
        </form>
      </div>
      <div className="w-1/2 ">
        <div className=" bg-green-300">
          <div>sd</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
