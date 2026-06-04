import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountsRequest } from '../../adminSlice/dashboardSlice';

export default function DashboardView() {
  const dispatch = useDispatch();
  const { counts, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCountsRequest());
  }, [dispatch]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-4xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-400 mt-2">Manage your entire portfolio data from one place.</p>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Projects" count={counts.projects} />
          <StatCard title="Total Skills" count={counts.skills} />
          <StatCard title="Experience Entries" count={counts.experience} />
        </div>
      )}
    </div>
  );
}

const StatCard = ({ title, count }) => (
  <div className="bg-[#282c33] p-6 rounded-xl border border-gray-700">
    <h3 className="text-gray-400 text-sm uppercase">{title}</h3>
    <p className="text-5xl font-bold text-[#c778dd] mt-2">{count}</p>
  </div>
);