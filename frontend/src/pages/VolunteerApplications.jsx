import React, { useState } from "react";
import { useApplications } from "../hooks/useApplications.js";

const VolunteerApplications = () => {
  const { applications, stats, loading, error } = useApplications();
  const [filter, setFilter] = useState("all");

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  if (loading) {
    return <div className="p-8 text-center">Loading applications...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, color: "bg-gray-100" },
          {
            label: "Pending",
            value: stats.pending,
            color: "bg-yellow-50",
            textColor: "text-yellow-600",
          },
          {
            label: "Accepted",
            value: stats.accepted,
            color: "bg-green-50",
            textColor: "text-green-600",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            color: "bg-red-50",
            textColor: "text-red-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} p-4 rounded-lg shadow`}
          >
            <div
              className={`text-2xl font-bold ${
                stat.textColor || "text-gray-900"
              }`}
            >
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "accepted", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 border font-medium rounded-md text-sm transition ${
              filter === tab
                ? "bg-[#1f3a5f] text-white border-[#1f3a5f]"
                : "border-[#1f3a5f] text-[#1f3a5f] hover:bg-[#1f3a5f] hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {filter === "all"
              ? "You haven't applied to any opportunities yet."
              : `You don't have any ${filter} applications.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">
                    {app.opportunity_id?.title}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    app.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-700 mb-4">
                {app.opportunity_id?.description}
              </p>

              {app.opportunity_id?.skillsRequired && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.opportunity_id.skillsRequired
                    .split(",")
                    .map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              )}

              <div className="text-sm text-gray-500">
                Applied on{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </div>

              {app.coverLetter && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Your Cover Letter</h4>
                  <p className="text-gray-600">{app.coverLetter}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerApplications;
