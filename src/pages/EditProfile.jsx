import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import useGetApiData from "../hooks/getApiData";
import { useSelector } from "react-redux";
import { uploadFile } from "../helpers/uploadFile";
import axios from "axios";
import FullLoader from "../components/FullLoader";
import toast from "react-hot-toast";
// import { uploadFile } from "../helpers/uploadFile";

const EditProfile = () => {
  const { user } = useSelector((store) => store.user);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    title: "",
    username: "",
    github: "",
    linkedin: "",
    desc: "",
    img: "",
    pdf: "",
  });

  const { data, getLoading, getError } = useGetApiData(
    `${process.env.REACT_APP_NODE_API}/users`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  useEffect(() => {
    if (!getError || !getLoading) {
      setUpdatedData({
        name: data?.name || "",
        email: data?.email || "",
        title: data?.title || "",
        username: data?.username || "",
        github: data?.social?.github || "",
        linkedin: data?.social?.linkedin || "",
        desc: data?.desc || "",
        img: data?.img || "",
        pdf: data?.pdf || "",
      });
    }
  }, [getError, getLoading]);
  const handleFileChange = async (e) => {
    setLoading(true);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const imageUrl = await uploadFile(selectedFile);
        setUpdatedData((prevData) => ({
          ...prevData,
          img: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setLoading(false);
  };
  const handleUploadResume = async (e) => {
    setLoading(true);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const pdfUrl = await uploadFile(selectedFile);
        setUpdatedData((prevData) => ({
          ...prevData,
          pdf: pdfUrl,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setLoading(false);
  };
  console.log(updatedData);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const response = await axios.patch(
        `${process.env.REACT_APP_NODE_API}/users`,
        updatedData,
        { headers }
      );
      toast.success("Profile Updated Successfully!!");
    } catch (error) {
      toast.error(error);
      console.error("Could Not Update");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Sidebar>
      <div className="p-4 h-full md:h-auto">
        <div className="p-4  rounded-lg shadow bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
            <h3 className="text-2xl font-semibold text-white">You Profile</h3>
          </div>
          <div>
            <div className="flex items-start sm:justify-start justify-center mb-8">
              <label className="flex items-center justify-center w-24 h-24 border-2  border-dashed rounded-full cursor-pointer hover:bg-bray-800 bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                {/* <img src={imgLink} alt="" /> */}
                {updatedData.img ? (
                  <img
                    className="w-24 h-24 rounded-full"
                    src={updatedData.img}
                    alt=""
                  />
                ) : file ? (
                  <img
                    className="w-24 h-24 rounded-full"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-mediumtext-white">
                  Name
                </label>
                <input
                  type="text"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter Name"
                  value={updatedData?.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your Username..."
                  readOnly
                  value={updatedData?.username}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="text"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your Email"
                  value={updatedData?.email}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Tag Line
                </label>
                <input
                  type="text"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter Designation.."
                  value={updatedData?.title}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Github
                </label>
                <input
                  type="text"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter Designation.."
                  value={updatedData?.github}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, github: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Linkedin
                </label>
                <input
                  type="text"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter Designation.."
                  value={updatedData?.linkedin}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, linkedin: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Upload Latest Resume
                </label>
                {updatedData?.pdf !== "" && (
                  <a
                    href={updatedData?.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                  >
                    View Resume
                  </a>
                )}
                <input
                  className=" border outline-none text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  id="multiple_files"
                  type="file"
                  onChange={handleUploadResume}
                  multiple
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="border outline-none text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write product description here"
                  value={updatedData?.desc}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, desc: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="text-white inline-flex items-center focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            >
              {loading ? <FullLoader /> : "Update"}
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default EditProfile;
