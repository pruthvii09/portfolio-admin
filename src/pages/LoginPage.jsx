import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostAPIData from "../hooks/postApiData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { AlertCircle } from "lucide-react";
import { setUser } from "../redux/userSclice.js";
const LoginPage = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  const { loading, error, sendData } = usePostAPIData();
  const handleSubmit = async () => {
    const res = await sendData(
      `${process.env.REACT_APP_NODE_API}/users/login`,
      null,
      {
        ...data,
      }
    );
    if (res) {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(setUser(res.data));
      navigate("/dashboard");
    }
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray-800">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  Your Username
                </label>
                <input
                  className="border outline-none border-gray-300  sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 :border-gray-600 placeholder-gray-400 text-white"
                  placeholder="Enter username"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border outline-none border-gray-300  sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 :border-gray-600 placeholder-gray-400 text-white"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium  hover:underline text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              {error && (
                <div className="flex items-center gap-3 text-red-600 text-sm">
                  <AlertCircle />
                  <p>{error}</p>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 "
              >
                {loading ? <Loader /> : "Login"}
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  onClick={() => navigate("/signup")}
                  className="font-medium  hover:underline text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
