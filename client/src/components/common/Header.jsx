import { LogOutIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApi";
import { logout } from "../../redux/features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("👋 Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="w-full h-20 bg-[#1F2937] shadow flex items-center justify-between px-10">
      <h1 className="text-3xl font-bold text-white tracking-wider">
        ChartCraft
      </h1>
      <div className="flex items-center space-x-5 text-white">
        <h2 className="text-lg font-medium tracking-wider">
          {userInfo?.user?.username}
        </h2>
        {userInfo.user.role === "admin" && <Link>Admin Dashbord</Link>}
        <LogOutIcon
          onClick={handleLogout}
          size={30}
          className="cursor-pointer hover:text-red-400 transition duration-200"
        />
      </div>
    </div>
  );
};

export default Header;
