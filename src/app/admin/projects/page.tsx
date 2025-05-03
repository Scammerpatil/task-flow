"use client";

import { Project } from "@/types/user";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await axios.get("/api/admin/projects");
      setProjects(res.data.projects);
      setLoading(false);
    };
    fetchProjects();
  }, []);
  return (
    <>
      <div className="text-3xl font-semibold mb-6 uppercase text-center">
        All Projects
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <progress className="progress w-56"></progress>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id as unknown as string}
              className="card w-96 bg-base-300 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p className="text-sm text-base-content">
                  {project.description}
                </p>
                <div className="mt-2 text-xs text-base-content capitalize">
                  Status: {project.status}
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    className="btn btn-sm btn-outline btn-primary"
                    href={`/admin/projects/view-details?id=${project._id}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-semibold">No Projects Found</h1>
          </div>
        )}
      </div>
    </>
  );
}
