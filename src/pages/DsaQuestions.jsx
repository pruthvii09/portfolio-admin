import React from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";

const DsaQuestions = () => {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <div className="flex justify-between">
        <h1 className="sm:text-3xl text-2xl">Your Questions</h1>
        <button
          onClick={() => navigate("/dashboard/dsa/add-question")}
          className="flex gap-2 rounded-md hover:bg-blue-600 bg-blue-700 items-center px-2 py-1"
        >
          Add Question
          <Plus size={18} />
        </button>
      </div>
    </Sidebar>
  );
};

export default DsaQuestions;
