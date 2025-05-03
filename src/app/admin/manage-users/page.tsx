"use client";

import { Manager } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageUserPage = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const fetchManagers = async () => {
    await axios.get("/api/managers").then((res) => {
      setManagers(res.data.managers);
    });
  };
  useEffect(() => {
    fetchManagers();
  }, []);

  const handleApproveManager = async (id: string, isApproved: boolean) => {
    const response = axios.get(
      "/api/managers/approve?id=" + id + "&isApproved=" + isApproved
    );
    toast.promise(response, {
      loading: "Approving Manager",
      success: () => {
        fetchManagers();
        return "Manager Approved";
      },
      error: "Failed to approve Manager",
    });
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase mb-6">
        Manage Your Managers
      </h1>
      <div className="overflow-x-auto bg-base-300 rounded-lg p-5">
        <table className="table table-zebra">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.length > 0 ? (
              managers.map((manager, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={manager.profileImage} alt={manager.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{manager.name}</div>
                        <div className="text-sm opacity-50">
                          {manager.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{manager.phone}</td>
                  <td className="uppercase">{manager.role}</td>
                  <td>
                    {manager.isApproved ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          handleApproveManager(
                            manager._id as unknown as string,
                            false
                          );
                        }}
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleApproveManager(
                            manager._id as unknown as string,
                            true
                          );
                        }}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No managers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ManageUserPage;
