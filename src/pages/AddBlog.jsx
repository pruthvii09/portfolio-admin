import React from "react";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import usePostAPIData from "../hooks/postApiData";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { ckEditorConfig } from "../constants/text-editor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const AddBlog = () => {
  const { user } = useSelector((store) => store.user);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { sendData, loading, error } = usePostAPIData();
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDesc(data);
    console.log(desc);
  };

  const handleAddBlog = async () => {
    const res = await sendData(
      `${process.env.REACT_APP_NODE_API}/blogs`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
      {
        title,
        desc,
      }
    );
    if (res) {
      setTitle("");
      setDesc("");
      toast.success("Blog Created Successfully");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <Sidebar>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-6">Add a Blog</h1>
        <button
          onClick={handleAddBlog}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? <Loader /> : "Add Blog"}
        </button>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title*
          </label>
          <input
            type="text"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Title of Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        About*
      </label>
      <div className="bg-white text-black rounded-lg">
        <CKEditor
          editor={Editor}
          config={ckEditorConfig}
          data="<p>Write your blog Here&nbsp;</p>"
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor.getData());
          }}
          onChange={handleEditorChange}
        />
      </div>
    </Sidebar>
  );
};

export default AddBlog;
