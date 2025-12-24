import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerOpportunityCard from "../components/VolunteerOpportunityCard";
import VolunteerFilterBar from "../components/VolunteerFilterBar";
import VolunteerOpportunityModal from "../components/VolunteerOpportunityModal";

const VolunteerOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedMap, setAppliedMap] = useState({});

  const [filters, setFilters] = useState({
    status: "All",
    locations: [],
    skills: [],
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  /* FETCH OPPORTUNITIES */
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/opportunities"
        );
        setOpportunities(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error("Failed to fetch opportunities", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  /* APPLY FILTERS */
  useEffect(() => {
    let data = [...opportunities];

    if (filters.status !== "All") {
      data = data.filter((o) => o.status === filters.status);
    }

    if (filters.locations.length > 0) {
      data = data.filter((o) =>
        filters.locations.includes(o.location)
      );
    }

    if (filters.skills.length > 0) {
      data = data.filter((o) =>
        filters.skills.some((skill) =>
          o.skillsRequired
            ?.toLowerCase()
            .includes(skill.toLowerCase())
        )
      );
    }

    setFiltered(data);
  }, [filters, opportunities]);

  /* CHECK IF ALREADY APPLIED */
  useEffect(() => {
    const checkAppliedStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token || opportunities.length === 0) return;

      const results = {};

      await Promise.all(
        opportunities.map(async (opp) => {
          try {
            const res = await axios.get(
              `http://localhost:8000/api/applications/applied/${opp._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            results[opp._id] = res.data.applied;
          } catch {
            results[opp._id] = false;
          }
        })
      );

      setAppliedMap(results);
    };

    checkAppliedStatus();
  }, [opportunities]);

  /* APPLY LOGIC */
  const handleApply = async (opportunityId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/applications/apply",
        { opportunityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Update UI instead of showing popup
      setAppliedMap((prev) => ({
        ...prev,
        [opportunityId]: true,
      }));
    } catch (error) {
      // If already applied, just update UI
      if (error.response?.data?.message === "You have already applied") {
        setAppliedMap((prev) => ({
          ...prev,
          [opportunityId]: true,
        }));
      } else {
        alert("Application failed");
      }
    }
  };

  /* DYNAMIC SKILLS & LOCATIONS */
  const availableSkills = [
    ...new Set(
      opportunities.flatMap((o) =>
        o.skillsRequired
          ? o.skillsRequired.split(",").map((s) => s.trim())
          : []
      )
    ),
  ];

  const availableLocations = [
    ...new Set(
      opportunities.map((o) => o.location).filter(Boolean)
    ),
  ];

  return (
    <div className="min-h-screen bg-[#E9F5F8] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">
          Volunteering Opportunities
        </h1>
        <p className="text-gray-600 mb-6">
          Discover opportunities that match your skills and interests
        </p>

        <VolunteerFilterBar
          filters={filters}
          setFilters={setFilters}
          skills={availableSkills}
          locations={availableLocations}
        />

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No opportunities found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((opp) => (
              <VolunteerOpportunityCard
                key={opp._id}
                opportunity={opp}
                onViewDetails={setSelectedOpportunity}
                onApply={handleApply}
                hasApplied={appliedMap[opp._id]}
              />
            ))}
          </div>
        )}
      </div>

      <VolunteerOpportunityModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </div>
  );
};

export default VolunteerOpportunities;
