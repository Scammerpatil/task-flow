"use client";

import { Project, Task } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import AddTask from "./AddTask";
import toast from "react-hot-toast";

const ManageTask = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const fetchProjects = async () => {
    const response = await axios.get("/api/projects");
    setProjects(response.data.projects);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const handleProjectStatusUpdate = async (id: string, status: string) => {
    const resposne = axios.put(
      `/api/projects/update?id=${id}&status=${status}`
    );
    toast.promise(resposne, {
      loading: "Updating task status...",
      success: "Task status updated successfully",
      error: "An error occurred while updating task status",
    });
    fetchProjects();
  };
  return (
    <>
      <h1 className="text-3xl uppercase text-pretty font-semibold mb-4 text-center">
        Manage Your Projects and Tasks
      </h1>
      <div className="overflow-x-auto my-5">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Tasks</th>
              <th>Status</th>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td>
                    <ul>
                      {project.tasks?.length! > 0 ? (
                        project.tasks?.map((task, index) => (
                          <li key={index}>
                            {task.title} - {task.status}
                          </li>
                        ))
                      ) : (
                        <li>No tasks found</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    {project.status === "completed" ? (
                      <span className="text-success capitalize">
                        {project.status}
                      </span>
                    ) : (
                      <select
                        className="select select-bordered"
                        value={project.status}
                        onChange={(e) =>
                          handleProjectStatusUpdate(project._id, e.target.value)
                        }
                      >
                        <option value="">Select Task Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    )}
                  </td>
                  <td>
                    {project.status === "completed" ? (
                      <span className="text-success capitalize">
                        {project.status}
                      </span>
                    ) : (
                      <button
                        className="btn btn-primary btn-outline"
                        onClick={() => {
                          setSelectedProject(project._id);
                          (
                            document.getElementById(
                              "addTask"
                            ) as HTMLDialogElement
                          ).showModal();
                        }}
                      >
                        Add Task
                      </button>
                    )}
                  </td>
                  <td>
                    {project.status === "completed" ? (
                      <span className="text-success capitalize">
                        {project.status}
                      </span>
                    ) : (
                      <span className="text-success capitalize">
                        {project.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="btn btn-primary mt-5 mx-auto"
          onClick={() => {
            (
              document.getElementById("addProject") as HTMLDialogElement
            ).showModal();
          }}
        >
          Add Project
        </button>
      </div>
      <AddProject />
      {selectedProject && <AddTask projectID={selectedProject} />}
    </>
  );
};
export default ManageTask;
