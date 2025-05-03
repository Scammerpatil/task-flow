"use client";
import { Team as TeamType, TeamMember } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Team = () => {
  const [teamMember, setTeamMember] = useState([]);
  const [team, setTeam] = useState<TeamType>();
  const [newTeam, setNewTeam] = useState({
    name: "",
    domain: "",
  });
  const fetchTeamMembers = async () => {
    const team = await axios.get("/api/team");
    setTeam(team.data.team);
    setTeamMember(team.data.members);
  };
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const addNewTeam = async () => {
    const response = axios.post("/api/team/addTeam", {
      name: newTeam.name,
      domain: newTeam.domain,
    });
    toast.promise(response, {
      loading: "Creating Team...",
      success: () => {
        fetchTeamMembers();
        return "Team Created";
      },
      error: "Failed to create team",
    });
  };
  const handleApprove = async (id: string, isApproved: boolean) => {
    const res = axios.get(
      `/api/teamMembers/approve?id=${id}&isApproved=${isApproved}`
    );
    toast.promise(res, {
      loading: "Approving...",
      success: () => {
        fetchTeamMembers();
        return "User Approved";
      },
      error: "Failed to approve user",
    });
  };
  return (
    <>
      <h1 className="text-3xl uppercase text-pretty font-semibold mb-4 text-center">
        Manage Your Team
      </h1>
      <div className="w-full">
        {team ? (
          <div className="card bg-base-300 shadow-xl p-6 rounded-lg">
            <div className="text-center py-4 text-2xl font-semibold bg-base-100 rounded-lg">
              {team.name}
            </div>
            <div className="card-body">
              <h2 className="card-title text-lg alert alert-info">
                {team.domain}
              </h2>
              <div className="overflow-x-auto bg-base-300 rounded-lg">
                <table className="table table-zebra">
                  <thead className="text-base bg-base-100">
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Role</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMember ? (
                      teamMember.map((member: TeamMember, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={member.profileImage}
                                    alt={member.name}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{member.name}</div>
                                <div className="text-sm opacity-50">
                                  {member.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{member.email}</td>
                          <td className="capitalize">{member.role}</td>
                          <td>
                            {member.isApproved ? (
                              <button className="btn btn-secondary">
                                Remove
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  handleApprove(
                                    member._id as unknown as string,
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
                        <td
                          colSpan={5}
                          className="text-center border border-base-content border-b"
                        >
                          No team members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-base-300 px-10 py-5 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-medium text-center mb-4">
              Create Team
            </h2>
            <div className="form-control w-full space-y-4">
              <label className="form-control w-full">
                <span className="label-text">Name</span>
                <input
                  type="text"
                  placeholder="Enter Team name"
                  className="input input-bordered w-full"
                  value={newTeam.name}
                  onChange={(e) => {
                    setNewTeam({
                      ...newTeam,
                      name: e.target.value,
                    });
                  }}
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Domain</span>
                <input
                  type="text"
                  placeholder="Enter team domain"
                  className="input input-bordered w-full"
                  value={newTeam.domain}
                  onChange={(e) => {
                    setNewTeam({
                      ...newTeam,
                      domain: e.target.value,
                    });
                  }}
                />
              </label>
              <button
                className="btn btn-primary w-full mt-4"
                onClick={addNewTeam}
                disabled={!newTeam.name || !newTeam.domain}
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
export default Team;
