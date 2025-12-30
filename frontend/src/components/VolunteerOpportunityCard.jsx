import React, { useState } from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import { useApplications } from "../hooks/useApplications.js";

const truncateText = (text, limit = 20) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text;
};

const VolunteerOpportunityCard = ({
  opportunity,
  onViewDetails,
  onApply,
  hasApplied,
}) => {
  const { applyForOpportunity } = useApplications();
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  
  const handleApplyClick = async () => {
    setApplying(true);
    const result = await applyForOpportunity(opportunity._id, coverLetter);
    setApplying(false);
    
    if (result.success) {
      alert('Application submitted successfully!');
      setShowModal(false);
      setCoverLetter('');
      // Call the original onApply if it exists
      if (onApply) onApply(opportunity._id);
    } else {
      alert('Error: ' + result.error);
    }
  };

  const isOpen = opportunity.status === "Open";
  const inProgress = opportunity.status === "In Progress";

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-6">

      {/* LEFT SECTION */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">
          {opportunity.title}
        </h3>

        <p className="text-sm font-semibold text-[#1f3a5f] mt-1">
          NGO: {opportunity.ngoName}
        </p>

        <p className="text-sm text-gray-600 mt-3">
          {truncateText(opportunity.description)}
        </p>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {opportunity.skillsRequired?.split(",").map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[#E6F4F7] text-[#1f3a5f]"
            >
              {skill.trim()}
            </span>
          ))}
        </div>

        {/* META INFO */}
        <div className="flex flex-wrap gap-6 text-sm font-medium text-[#2D4A60] mt-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#6EC0CE]" />
            {opportunity.location || "Remote"}
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-[#6EC0CE]" />
            {opportunity.duration || "Flexible"}
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#6EC0CE]" />
            {new Date(opportunity.createdAt).toLocaleDateString()}
          </div>
        </div>

        <button
          onClick={() => onViewDetails(opportunity)}
          className="mt-5 px-4 py-2 border font-medium border-[#1f3a5f] text-[#1f3a5f] rounded-md text-sm hover:bg-[#1f3a5f] hover:text-white"
        >
          View Details
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col items-end justify-between">
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${
            isOpen
              ? "bg-green-100 text-green-700"
              : inProgress
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {opportunity.status}
        </span>

        {/* APPLY / APPLIED BUTTON */}
        {hasApplied ? (
          <button
            disabled
            className="mt-6 px-5 py-2 bg-green-100 text-green-800 rounded-md cursor-not-allowed"
          >
            ✓ Applied
          </button>
        ) : isOpen || inProgress ? (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-5 py-2 bg-[#FF7A30] text-white rounded-md hover:bg-[#e86a22]"
          >
            Apply
          </button>
        ) : (
          <button
            disabled
            className="mt-6 px-5 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
          >
            Apply
          </button>
        )}
      </div>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Apply for {opportunity.title}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setCoverLetter('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter (Optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell us why you're interested in this opportunity..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setCoverLetter('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyClick}
                disabled={applying}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {applying ? 'Applying...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerOpportunityCard;
