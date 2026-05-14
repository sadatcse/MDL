'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';



export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    }
    fetchUser();
  }, []);

  const stats = [
    { label: 'Total Projects', value: '32', icon: Building2, change: '+4', trend: 'up', color: 'brand-green' },
    { label: 'Active Clients', value: '1,284', icon: Users, change: '+12%', trend: 'up', color: 'blue-500' },
    { label: 'Market Value', value: '$84.2M', icon: TrendingUp, change: '-2.4%', trend: 'down', color: 'amber-500' },
    { label: 'Upcoming Handover', value: '5', icon: Calendar, change: 'In 30 days', trend: 'neutral', color: 'purple-500' },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <section>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-foreground tracking-tight"
        >
          Welcome Back, <span className="text-brand-green">{user?.full_name?.split(' ')[0] || 'User'}</span>
        </motion.h1>
        <p className="text-brand-medium-gray dark:text-zinc-500 mt-2 font-medium">Here's what's happening with Mohammadi Developers today.</p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-brand-soft-gray dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : stat.trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                {stat.change}
              </div>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black mt-1 tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Tables/Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <section className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-brand-soft-gray dark:border-zinc-800 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Recent Projects</h2>
            <button className="text-brand-green font-bold text-sm hover:underline flex items-center gap-1">
              View All <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            {[
              { name: 'MDL Sky Gardens', location: 'Gulshan 2', status: 'In Progress', progress: 65 },
              { name: 'Mohammadi Heights', location: 'Uttara', status: 'Completed', progress: 100 },
              { name: 'Eco Living Suite', location: 'Purbachal', status: 'Planning', progress: 15 },
            ].map((project) => (
              <div key={project.name} className="flex flex-col gap-3 p-4 rounded-2xl hover:bg-brand-light-gray dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-brand-soft-gray dark:hover:border-zinc-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <p className="text-xs text-zinc-500 font-medium">{project.location}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${project.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-brand-green/10 text-brand-green border-brand-green/20'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-brand-soft-gray dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-brand-green h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Feed */}
        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-brand-soft-gray dark:border-zinc-800 shadow-sm p-8">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Activity Feed</h2>
          <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-brand-soft-gray dark:before:bg-zinc-800">
            {[
              { title: 'New inquiry received', time: '12 mins ago', color: 'brand-green' },
              { title: 'Payment verified: #8421', time: '2 hours ago', color: 'blue-500' },
              { title: 'Project timeline updated', time: '5 hours ago', color: 'amber-500' },
              { title: 'New team member added', time: '1 day ago', color: 'purple-500' },
            ].map((activity) => (
              <div key={activity.title} className="relative pl-10">
                <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 flex items-center justify-center z-10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                </div>
                <p className="font-bold text-sm leading-tight">{activity.title}</p>
                <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
