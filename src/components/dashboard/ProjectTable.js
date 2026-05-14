'use client';

import React from 'react';
import { Edit2, Trash2, ExternalLink, MapPin, Building2, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function ProjectTable({ projects, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto rounded-3xl border border-brand-soft-gray dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-brand-light-gray/50 dark:bg-zinc-900/50 border-b border-brand-soft-gray dark:border-zinc-800">
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500">Project</th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500">Status & Type</th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500">Location</th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-brand-soft-gray dark:divide-zinc-800">
                    {projects.map((project) => (
                        <tr key={project.id} className="group hover:bg-brand-light-gray/30 dark:hover:bg-zinc-900/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-12 relative rounded-xl overflow-hidden border border-brand-soft-gray dark:border-zinc-800 bg-brand-light-gray dark:bg-zinc-900">
                                        {project.photo_thumbnail ? (
                                            <Image 
                                                src={project.photo_thumbnail} 
                                                alt={project.project_name} 
                                                fill 
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Building2 className="w-6 h-6 m-auto text-zinc-400 mt-3" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-foreground">{project.project_name}</p>
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-brand-medium-gray dark:text-zinc-500">
                                            {project.developer || 'Internal Project'}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className={`w-fit px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                        project.project_status === 'ongoing' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10' :
                                        project.project_status === 'handovered' ? 'bg-green-100 text-green-600 dark:bg-green-500/10' :
                                        'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
                                    }`}>
                                        {project.project_status}
                                    </span>
                                    <span className="text-xs text-brand-medium-gray dark:text-zinc-500 flex items-center gap-1">
                                        <Building2 className="w-3 h-3" />
                                        {project.project_type}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-0.5 max-w-[200px]">
                                    <p className="text-xs font-bold truncate">{project.area}, {project.city}</p>
                                    <p className="text-[10px] text-brand-medium-gray dark:text-zinc-500 truncate flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {project.project_address}
                                    </p>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => onEdit(project)}
                                        className="p-2.5 rounded-xl bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 text-brand-medium-gray hover:text-brand-green hover:border-brand-green/30 transition-all"
                                        title="Edit Project"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => onDelete(project)}
                                        className="p-2.5 rounded-xl bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 text-brand-medium-gray hover:text-red-500 hover:border-red-500/30 transition-all"
                                        title="Delete Project"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {project.project_url && (
                                        <a 
                                            href={project.project_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 text-brand-medium-gray hover:text-brand-green transition-all"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan="4" className="px-6 py-20 text-center">
                                <Building2 className="w-12 h-12 mx-auto text-brand-soft-gray dark:text-zinc-800 mb-4" />
                                <p className="text-brand-medium-gray dark:text-zinc-500 font-bold">No projects found matching your criteria.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
