import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { AlertCircle, Edit, Github, Globe, Plus, Trash2 } from "lucide-react";
import useGetApiData from "../hooks/getApiData";
import Loader from "../components/Loader.jsx";
import Dialog from "../components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setProjects,
  addProject,
  deleteProject,
} from "../redux/productSclice.js";
import ProjectCard from "../components/Skeleton/ProjectCard";
import usePostAPIData from "../hooks/postApiData";
import axios from "axios";
import toast from "react-hot-toast";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState({
    title: "",
    desc: "",
    liveLink: "",
    github: "",
  });
  const { user } = useSelector((store) => store.user);
  const { projects } = useSelector((store) => store.projects);
  const [openDialog, setOpenDialog] = useState(false);
  const { sendData, loading, error } = usePostAPIData();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_NODE_API}/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response) {
        dispatch(deleteProject(id));
        toast.success("Project Deleted Successfully");
      }
    } catch (error) {
      console.error(`Error`);
    }
  };
  const handleSubmit = async () => {
    const res = await sendData(
      `${process.env.REACT_APP_NODE_API}/projects`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
      {
        ...projectData,
      }
    );
    if (res) {
      dispatch(addProject(res?.data?.project));
      setOpenDialog(!openDialog);
      setProjectData({
        title: "",
        desc: "",
        liveLink: "",
        github: "",
      });
      toast.success("Project Created Successfully!!");
    }
    if (error) {
      toast.error(error);
    }
  };
  const { data, getLoading, getError } = useGetApiData(
    `${process.env.REACT_APP_NODE_API}/projects`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (!getError || !getLoading) {
      dispatch(setProjects(data?.data?.projects));
    }
  }, [data, getLoading, getError]);
  return (
    <Sidebar>
      <div>
        <div className="flex justify-between">
          <h1 className="sm:text-3xl text-2xl">Add Projects</h1>
          <button
            onClick={() => setOpenDialog(!openDialog)}
            className="flex gap-2 rounded-md hover:bg-blue-600 bg-blue-700 items-center px-2 py-1"
          >
            Add Project
            <Plus size={18} />
          </button>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 place-items-center sm:place-items-stretch gap-4 py-5">
          {getLoading ? (
            <ProjectCard />
          ) : (
            projects &&
            projects.map((project) => (
              <div className="block relative w-80 p-6  border rounded-lg shadow  border-gray-700 hover:bg-gray-700">
                <div className="absolute right-2 top-2 flex gap-2">
                  <Edit size={18} />
                  <Trash2
                    onClick={() => handleDelete(project._id)}
                    size={18}
                    color="red"
                  />
                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  {project.title}
                </h5>
                <p className="font-normal text-gray-400">
                  {project?.desc?.substring(0, 50)}...
                </p>
                <div className="flex gap-2 mt-3">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank">
                      <Globe size={20} />
                    </a>
                  )}
                  {project.github && <Github size={20} />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Dialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={"Add Project"}
        children={
          <div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Title*
                </label>
                <input
                  type="text"
                  className=" border outline-none   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Title"
                  value={projectData.title}
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Live Link
                </label>
                <input
                  type="text"
                  className=" border outline-none   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Live Link"
                  value={projectData.liveLink}
                  onChange={(e) =>
                    setProjectData({ ...projectData, liveLink: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Github*
                </label>
                <input
                  type="text"
                  className=" border outline-none   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Github Link"
                  value={projectData.github}
                  onChange={(e) =>
                    setProjectData({ ...projectData, github: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                About*
              </label>
              <textarea
                rows="4"
                className=" border outline-none   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write about You..."
                value={projectData.desc}
                onChange={(e) =>
                  setProjectData({ ...projectData, desc: e.target.value })
                }
              ></textarea>
              {error && (
                <div className="flex mt-2 items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={18} />
                  <p>{error}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              {loading ? <Loader /> : "Add Project"}
            </button>
          </div>
        }
      />
    </Sidebar>
  );
};

export default Projects;
