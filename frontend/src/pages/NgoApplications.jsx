import React, { useState } from 'react';
import { useApplications } from "../hooks/useApplications.js";

const NgoApplications = () => {
  const { applications, stats, loading, error, updateApplicationStatus } = useApplications();
  const [filter, setFilter] = useState('all');

  // Filter applications
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const handleStatusUpdate = async (appId, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
      const result = await updateApplicationStatus(appId, newStatus);
      if (result.success) {
        alert(`Application ${newStatus} successfully!`);
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading applications...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Volunteer Applications</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'bg-gray-100' },
          { label: 'Pending', value: stats.pending, color: 'bg-yellow-50', textColor: 'text-yellow-600' },
          { label: 'Accepted', value: stats.accepted, color: 'bg-green-50', textColor: 'text-green-600' },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-50', textColor: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} p-4 rounded-lg shadow`}>
            <div className={`text-2xl font-bold ${stat.textColor || 'text-gray-900'}`}>
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

      {/* Filter Tabs - Updated styling */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'accepted', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 border font-medium rounded-md text-sm transition capitalize ${
              filter === tab 
                ? 'bg-[#1f3a5f] text-white border-[#1f3a5f]'  // Active state
                : 'border-[#1f3a5f] text-[#1f3a5f] hover:bg-[#1f3a5f] hover:text-white'  // Inactive state
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
            {filter === 'all' 
              ? "You don't have any applications yet." 
              : `You don't have any ${filter} applications.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{app.opportunity_id?.title}</h3>
                  <p className="text-gray-600">
                    Applied by: <span className="font-medium">{app.volunteer_id?.fullName}</span>
                  </p>
                  <p className="text-sm text-gray-500">{app.volunteer_id?.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{app.opportunity_id?.description}</p>

              {app.volunteer_id?.skills?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Volunteer Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.volunteer_id.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Applied on {new Date(app.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  {app.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'accepted')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoApplications;