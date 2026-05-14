'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Loader2, Building2, LayoutGrid, List as ListIcon } from 'lucide-react';
import ProjectTable from '@/components/dashboard/ProjectTable';
import ProjectForm from '@/components/dashboard/ProjectForm';

export default function DashboardProjects() {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        let result = projects;
        
        if (searchTerm) {
            result = result.filter(p => 
                p.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.city?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            result = result.filter(p => p.project_status === filterStatus);
        }

        setFilteredProjects(result);
    }, [searchTerm, filterStatus, projects]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingProject(null);
        setView('form');
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setView('form');
    };

    const handleDelete = async (project) => {
        if (!confirm(`Are you sure you want to delete "${project.project_name}"?`)) return;

        try {
            const res = await fetch(`/api/projects/${project.slug || project.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchProjects();
            } else {
                alert(result.error || 'Failed to delete project');
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleSave = () => {
        setView('list');
        fetchProjects();
    };

    if (view === 'form') {
        return (
            <div className="max-w-7xl mx-auto">
                <ProjectForm 
                    project={editingProject} 
                    onSave={handleSave} 
                    onCancel={() => setView('list')} 
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-brand-green mb-2">Projects Repository</h1>
                    <p className="text-brand-medium-gray dark:text-zinc-500 font-bold text-sm uppercase tracking-wider">
                        Manage your real estate portfolio, edit details, and upload media.
                    </p>
                </div>
                <button 
                    onClick={handleAddNew}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-green text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Projects', value: projects.length, color: 'text-brand-green' },
                    { label: 'Ongoing', value: projects.filter(p => p.project_status === 'ongoing').length, color: 'text-blue-500' },
                    { label: 'Upcoming', value: projects.filter(p => p.project_status === 'upcoming').length, color: 'text-amber-500' },
                    { label: 'Handovered', value: projects.filter(p => p.project_status === 'handovered').length, color: 'text-green-500' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name, area or city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3.5 pl-10 pr-4 text-sm focus:outline-none appearance-none shadow-sm font-bold"
                        >
                            <option value="all">All Status</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="ready">Ready</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="handovered">Handovered</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Project List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                    <Loader2 className="w-12 h-12 text-brand-green animate-spin mb-4" />
                    <p className="text-brand-medium-gray dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">Syncing Portfolio...</p>
                </div>
            ) : (
                <ProjectTable 
                    projects={filteredProjects} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}
        </div>
    );
}
