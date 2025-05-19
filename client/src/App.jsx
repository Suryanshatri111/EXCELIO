import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default App;
