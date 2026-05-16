'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Loader2, Calendar, Edit2, Trash2, Globe, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import UpdateForm from '@/components/dashboard/UpdateForm';
import Link from 'next/link';

export default function DashboardUpdates() {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUpdate, setEditingUpdate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/updates');
            const data = await res.json();
            if (Array.isArray(data)) {
                setUpdates(data);
            }
        } catch (error) {
            console.error('Failed to fetch updates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingUpdate(null);
        setView('form');
    };

    const handleEdit = (update) => {
        setEditingUpdate(update);
        setView('form');
    };

    const handleDelete = async (update) => {
        if (!confirm(`Are you sure you want to delete "${update.title}"?`)) return;

        try {
            const res = await fetch(`/api/updates/${update.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchUpdates();
            } else {
                alert(result.error || 'Failed to delete update');
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleSave = () => {
        setView('list');
        fetchUpdates();
    };

    const filteredUpdates = updates.filter(u => 
        u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.source?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (view === 'form') {
        return (
            <div className="max-w-7xl mx-auto">
                <UpdateForm 
                    update={editingUpdate} 
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
                    <h1 className="text-3xl font-black tracking-tight text-brand-green mb-2">Media & Events</h1>
                    <p className="text-brand-medium-gray dark:text-zinc-500 font-bold text-sm uppercase tracking-wider">
                        Publish news, awards, corporate announcements, and project launches.
                    </p>
                </div>
                <button 
                    onClick={handleAddNew}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-green text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Publication
                </button>
            </div>

            {/* Toolbar */}
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                    type="text" 
                    placeholder="Search publications by title, type or source..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all shadow-sm"
                />
            </div>

            {/* List View */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                    <Loader2 className="w-12 h-12 text-brand-green animate-spin mb-4" />
                    <p className="text-brand-medium-gray dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">Accessing Archives...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredUpdates.map((u) => (
                        <div key={u.id} className="bg-white dark:bg-zinc-950 p-4 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm group hover:border-brand-green/30 transition-all">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-full md:w-48 h-32 relative rounded-2xl overflow-hidden border border-brand-soft-gray dark:border-zinc-800 shrink-0">
                                    {u.image ? (
                                        <Image src={u.image} alt={u.title} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-brand-light-gray dark:bg-zinc-900 flex items-center justify-center">
                                            <Globe className="w-8 h-8 text-zinc-400" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 bg-brand-green/90 backdrop-blur-sm text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full">
                                        {u.type}
                                    </div>
                                </div>

                                <div className="flex-grow min-w-0 py-2">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="flex items-center gap-1.5 text-brand-medium-gray dark:text-zinc-500">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{u.date}</span>
                                        </div>
                                        <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full"></div>
                                        <div className="flex items-center gap-1.5 text-brand-medium-gray dark:text-zinc-500">
                                            <Globe className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{u.source || 'MDL News'}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-green transition-colors truncate pr-10">
                                        {u.title}
                                    </h3>
                                    <p className="text-xs text-brand-medium-gray dark:text-zinc-400 line-clamp-1 max-w-3xl">
                                        {u.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 pr-4">
                                    <Link 
                                        href={`/updates/${u.slug}`}
                                        target="_blank"
                                        className="p-3 rounded-2xl bg-brand-light-gray dark:bg-zinc-900 text-brand-medium-gray hover:text-brand-green transition-all"
                                        title="View Live"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                    <button 
                                        onClick={() => handleEdit(u)}
                                        className="p-3 rounded-2xl bg-brand-light-gray dark:bg-zinc-900 text-brand-medium-gray hover:text-brand-green transition-all"
                                        title="Edit Update"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(u)}
                                        className="p-3 rounded-2xl bg-brand-light-gray dark:bg-zinc-900 text-brand-medium-gray hover:text-red-500 transition-all"
                                        title="Delete Update"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {filteredUpdates.length === 0 && (
                        <div className="py-20 text-center bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                            <Globe className="w-12 h-12 mx-auto text-brand-soft-gray dark:text-zinc-800 mb-4" />
                            <p className="text-brand-medium-gray dark:text-zinc-500 font-bold">No publications found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
