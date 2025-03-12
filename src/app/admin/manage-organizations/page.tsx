"use client";
import { useAuth } from "@/context/AuthProvider";
import { Organization } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageOrganizationsPage = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization>();
  const [newOrganization, setNewOrganization] = useState({
    name: "",
    domain: "",
  });

  const fetchOrganizations = async () => {
    const res = await axios.get("/api/organization");
    setOrganizations(res.data.organization);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const addOrganization = async () => {
    const response = axios.post("/api/organization/addOrganization", {
      newOrganization,
      user,
    });
    toast.promise(response, {
      loading: "Creating Organization",
      success: () => {
        fetchOrganizations();
        return "Organization Created";
      },
      error: "Failed to create Organization",
    });
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase mb-6">
        Manage Organizations
      </h1>
      <div className="w-full">
        {organizations ? (
          <div className="card bg-base-300 shadow-xl p-6 rounded-lg">
            <div className="text-center py-4 text-2xl font-semibold bg-base-100 rounded-lg">
              {organizations.name}
            </div>
            <div className="card-body mt-4">
              <h2 className="card-title text-lg">{organizations.domain}</h2>
              <div className="divider"></div>
              <h1 className="text-xl font-medium">Teams</h1>
              <ul className="list-disc pl-5">
                {organizations.teams.length > 0 ? (
                  organizations.teams.map((team, index) => (
                    <li key={index} className="py-1 flex flex-col">
                      {team.name}
                      <span>Manager - {team.manager?.name}</span>
                      <span>Domain - {team.domain}</span>
                      <span>
                        Team Member
                        {team.members.map((member, index) => (
                          <span key={index}>{member.name}</span>
                        ))}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-base-content">No Teams</li>
                )}
              </ul>
              <div className="card-actions mt-4 flex justify-end gap-3">
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-secondary">Delete</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-base-300 p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-medium text-center mb-4">
              Create Organization
            </h2>
            <div className="form-control w-full space-y-4">
              <label className="form-control w-full">
                <span className="label-text">Name</span>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="input input-bordered w-full"
                  value={newOrganization.name}
                  onChange={(e) => {
                    setNewOrganization({
                      ...newOrganization,
                      name: e.target.value,
                    });
                  }}
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Domain</span>
                <input
                  type="text"
                  placeholder="Enter organization domain"
                  className="input input-bordered w-full"
                  value={newOrganization.domain}
                  onChange={(e) => {
                    setNewOrganization({
                      ...newOrganization,
                      domain: e.target.value,
                    });
                  }}
                />
              </label>
              <button
                className="btn btn-primary w-full mt-4"
                onClick={addOrganization}
                disabled={!newOrganization.name || !newOrganization.domain}
              >
                Add Organization
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageOrganizationsPage;
