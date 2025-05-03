"use client";

import { useAuth } from "@/context/AuthProvider";
import { Task, Team, TeamMember } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddTask = ({ projectID }: { projectID: any }) => {
  const { user } = useAuth();
  const [teamMember, setTeamMember] = useState<TeamMember[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    status: "pending",
    project: projectID,
    assignedTo: user as unknown as TeamMember,
  });
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const res = await axios.get("/api/teamMembers");
      setTeamMember(res.data.teamMembers);
    };
    fetchTeamMembers();
  }, []);
  const addTask = async () => {
    if (newTask.title === "" || newTask.description === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const res = axios.post("/api/projects/addTask", {
      ...newTask,
    });
    toast.promise(res, {
      loading: "Adding Task...",
      success: "Task Added Successfully",
      error: "Failed to Add Task",
    });
  };
  return (
    <dialog id="addTask" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-xl uppercase text-center">
          Hey, {user?.name}
        </h3>
        <div className="modal-box mx-auto bg-base-300 mt-5 space-y-5">
          <div className="form-control w-full">
            <label className="label">Task Title</label>
            <input
              type="text"
              placeholder="Enter the Project Title"
              className="input input-bordered w-full"
              value={newTask?.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full">
            <label className="label">Task Description</label>
            <input
              type="text"
              placeholder="Enter the Project Descritpion"
              className="input input-bordered w-full"
              value={newTask?.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full">
            <label className="label">Assign To</label>
            <select
              className="select select-bordered w-full"
              value={newTask?.assignedTo as unknown as string}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  assignedTo: e.target.value as unknown as TeamMember,
                })
              }
            >
              <option value="">Select Team Member</option>
              {teamMember.map((member) => (
                <option
                  value={member._id as unknown as string}
                  key={member._id as unknown as string}
                >
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              addTask();
            }}
          >
            Add Task
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

export default AddTask;
