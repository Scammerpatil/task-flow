"use client";
import { Project } from "@/types/user";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(false);
  const fetchProject = async () => {
    setLoading(true);
    const res = await axios.get(`/api/projects/getProject?id=${id}`);
    setProject(res.data.project);
    setLoading(false);
  };
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{project?.title}</h1>
      <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-sm text-base-content">{project?.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="badge badge-info text-info-content capitalize">
            {project?.status}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Start Date</h2>
          <p className="text-sm text-base-content">
            {new Date(project?.createdAt!).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewDetailsPage;
