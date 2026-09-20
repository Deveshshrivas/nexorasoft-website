import { useState, useEffect } from "react";
import { FiBox, FiServer, FiMail, FiStar } from "react-icons/fi";
import { getProjects, getServices, getMessages } from "../../api/api";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-${color}-50 text-${color}-500`}>
      <Icon className="text-2xl" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0, services: 0, messages: 0, featuredProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProjects(),
      getServices(),
      getMessages()
    ]).then(([projectsRes, servicesRes, msgRes]) => {
      const projects = projectsRes.data || [];
      setStats({
        projects: projects.length,
        featuredProjects: projects.filter(p => p.featured).length,
        services: (servicesRes.data || []).length,
        messages: (msgRes.data || []).length
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner mx-auto mt-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value={stats.projects} icon={FiBox} color="blue" />
        <StatCard title="Featured Projects" value={stats.featuredProjects} icon={FiStar} color="orange" />
        <StatCard title="Total Services" value={stats.services} icon={FiServer} color="green" />
        <StatCard title="Contact Messages" value={stats.messages} icon={FiMail} color="purple" />
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
        <div className="text-6xl mb-4">??</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to your Admin Dashboard!</h3>
        <p className="text-gray-500 max-w-lg mx-auto">
          Use the sidebar on the left to manage your website&apos;s portfolio projects, services, and customer messages. Changes made here will immediately reflect on the live website.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

