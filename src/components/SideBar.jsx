import React, { useState } from "react";
import { logoutUser } from "../redux/userSclice.js";
import {
  LayoutDashboard,
  Menu,
  NotebookPen,
  User,
  LogOut,
  FileJson2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAllProjects } from "../redux/productSclice.js";
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((store) => store.blogs);
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    dispatch(removeAllProjects());
    navigate("/");
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-2 text-white flex sm:hidden items-center justify-end text-end"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu />
      </button>

      <aside
        className={`fixed top-0 sm:left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          open ? "left-64" : ""
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-800">
          <div className="text-2xl text-white font-bold mb-3">
            Portfolio Builder
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to={"/dashboard"}
                className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
              >
                <User />
                <span className="ms-3">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/projects"}
                className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
              >
                <LayoutDashboard />
                <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/blogs"}
                className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
              >
                <NotebookPen />
                <span className="flex-1 ms-3 whitespace-nowrap">Blog</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full bg-gray-700 text-gray-300">
                  {blogs?.length ? blogs.length : 0}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/dsa"}
                className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
              >
                <FileJson2 />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  DSA Questions
                </span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full text-start items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
              >
                <LogOut color="red" />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      {/* {open && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black opacity-75 cursor-pointer overflow-hidden z-30"
          onClick={() => setOpen(!open)}
        ></div>
      )} */}
      <div className="p-4 sm:ml-64 h- sm:h-screen text-white">{children}</div>
    </div>
  );
};

export default Sidebar;
