"use client";
import { useAuth } from "@/context/AuthProvider";
import { Organization } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManangeOrganizationsPage = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<Organization>();
  const [newOrganization, setNewOrganization] = useState({
    name: "",
    domain: "",
  });

  const fetchOrganizations = async () => {
    const res = await axios.get("/api/organization");
    setOrganizations(res.data.organization);
    console.log(res.data.organization);
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
      <h1 className="text-3xl uppercase text-pretty font-semibold mb-4 text-center">
        Manage Organizations
      </h1>
      <div className="flex flex-col items-center justify-center w-full">
        {organizations ? (
          <div className="form-control w-1/2 p-10 space-y-5 border border-base-content rounded-md">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="Enter the domain of organization"
                className="input input-bordered w-full"
                value={organizations.name}
                onChange={(e) => {
                  setNewOrganization({
                    ...newOrganization,
                    domain: e.target.value,
                  });
                }}
                readOnly
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Domain</span>
              </div>
              <input
                type="text"
                placeholder="Enter the domain of organization"
                className="input input-bordered w-full"
                value={organizations.domain}
                onChange={(e) => {
                  setNewOrganization({
                    ...newOrganization,
                    domain: e.target.value,
                  });
                }}
                readOnly
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Manager</span>
              </div>
              <input
                type="text"
                placeholder="Enter the domain of organization"
                className="input input-bordered w-full"
                value={organizations.manager.name}
                onChange={(e) => {
                  setNewOrganization({
                    ...newOrganization,
                    domain: e.target.value,
                  });
                }}
                readOnly
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Team Member</span>
              </div>
            </label>
          </div>
        ) : (
          <div className="form-control w-1/2 p-10 space-y-5 border border-base-content rounded-md">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="Enter the name of organization"
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
              <div className="label">
                <span className="label-text">Domain</span>
              </div>
              <input
                type="text"
                placeholder="Enter the domain of organization"
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
              className="btn btn-primary w-full"
              onClick={addOrganization}
              disabled={!newOrganization.name || !newOrganization.domain}
            >
              Add Organization
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default ManangeOrganizationsPage;
