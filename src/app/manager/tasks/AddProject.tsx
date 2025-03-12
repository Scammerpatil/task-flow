"use client";

import { useAuth } from "@/context/AuthProvider";
import { Project } from "@/types/user";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProject = () => {
  const { user } = useAuth();
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    status: "pending",
    organization: user.organization,
  });
  const addProject = async () => {
    if (newProject.title === "" || newProject.description === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const res = axios.post("/api/projects/addProject", {
      ...newProject,
      manager: user,
    });
    toast.promise(res, {
      loading: "Adding Project...",
      success: "Project Added Successfully",
      error: "Failed to Add Project",
    });
  };
  return (
    <dialog id="addProject" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-xl uppercase text-center">
          Hey, {user.name}
        </h3>
        <div className="modal-box mx-auto bg-base-300 mt-5 space-y-5">
          <div className="form-control w-full">
            <label className="label">Project Title</label>
            <input
              type="text"
              placeholder="Enter the Project Title"
              className="input input-bordered w-full"
              value={newProject?.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full">
            <label className="label">Project Description</label>
            <input
              type="text"
              placeholder="Enter the Project Descritpion"
              className="input input-bordered w-full"
              value={newProject?.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              addProject();
            }}
          >
            Add Project
          </button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddProject;
