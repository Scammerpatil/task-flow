"use client";
import { TeamMember } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const Team = () => {
  const [teamMember, setTeamMember] = useState([]);
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const res = await axios.get("/api/teamMembers");
      setTeamMember(res.data.teamMembers);
      console.log(res.data.teamMembers);
    };
    fetchTeamMembers();
  }, []);
  return (
    <>
      <h1 className="text-3xl uppercase text-pretty font-semibold mb-4 text-center">
        Manage Your Team
      </h1>
      <div className="w-full p-10 border border-base-content rounded-md">
        <table className="table w-full text-base text-base-content table-zebra">
          <thead className="table table-header-group text-base border border-base-content border-b">
            <td>#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Actions</td>
          </thead>
          <tbody>
            {teamMember ? (
              teamMember.map((member: TeamMember, index) => (
                <tr
                  key={member._id}
                  className="table-row border border-base-content border-b"
                >
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    <button className="btn btn-error">Remove</button>
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
    </>
  );
};
export default Team;
