"use client";

import { Task } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data.tasks);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const handleTaskStatusChange = async (taskId: string, status: string) => {
    const resposne = axios.put(
      `/api/tasks/update?taskId=${taskId}&status=${status}`
    );
    toast.promise(resposne, {
      loading: "Updating task status...",
      success: "Task status updated successfully",
      error: "An error occurred while updating task status",
    });
    fetchTasks();
  };
  return (
    <>
      <h1 className="text-3xl uppercase text-pretty font-semibold mb-4 text-center">
        Manage Your Tasks
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra bg-base-300 rounded-lg">
          {/* head */}
          <thead className="bg-base-200 text-base-content text-base">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task._id as unknown as string}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    {task.status === "completed" ? (
                      <span className="btn btn-sm btn-success text-success-content capitalize">
                        {task.status}
                      </span>
                    ) : (
                      <select
                        className="select select-bordered"
                        value={task.status}
                        onChange={(e) =>
                          handleTaskStatusChange(
                            task._id as unknown as string,
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Task Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TaskPage;
