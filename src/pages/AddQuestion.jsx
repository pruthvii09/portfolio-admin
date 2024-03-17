import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import MDEditor from "@uiw/react-md-editor";
import usePostAPIData from "../hooks/postApiData";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddQuestion = () => {
  const [content, setContent] = useState(
    " # Question \n\n # Intuition \n\n # Approach \n\n # Complexity \n Time complixity is $$O(n)$$ \n\n # Code \n ``` \nYour code goes here...\n```"
  );
  const { user } = useSelector((store) => store.user);
  const { sendData, loading, error } = usePostAPIData();
  const [title, setTitle] = useState("DSA Question");
  const handleAddQuestion = async () => {
    const res = await sendData(
      `${process.env.REACT_APP_NODE_API}/dsa`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },
      {}
    );
    if (res) {
      toast.success("Blog Created Successfully");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <Sidebar>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-6">Add a Question</h1>
        <button
          onClick={handleAddQuestion}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Question
        </button>
      </div>
      <div className="container">
        <MDEditor height={500} value={content} onChange={setContent} />
      </div>
    </Sidebar>
  );
};

export default AddQuestion;
