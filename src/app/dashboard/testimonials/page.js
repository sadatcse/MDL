'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Loader2, Quote, Edit2, Trash2, Star } from 'lucide-react';
import Image from 'next/image';
import TestimonialForm from '@/components/dashboard/TestimonialForm';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';

export default function DashboardTestimonials() {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/testimonials');
            const data = await res.json();
            if (Array.isArray(data)) {
                setTestimonials(data);
            }
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingTestimonial(null);
        setView('form');
    };

    const handleEdit = (testimonial) => {
        setEditingTestimonial(testimonial);
        setView('form');
    };

    const handleDelete = async (testimonial) => {
        const confirmed = await showConfirm(
            'Delete Testimonial?',
            `Are you sure you want to delete the testimonial from "${testimonial.name}"?`
        );
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/testimonials/${testimonial.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                showSuccess('Deleted!', 'The testimonial has been deleted successfully.');
                fetchTestimonials();
            } else {
                showError('Failed to Delete', result.error || 'Failed to delete testimonial');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            showError('Error', 'An error occurred while deleting.');
        }
    };

    const handleSave = () => {
        setView('list');
        fetchTestimonials();
    };

    const filteredTestimonials = testimonials.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (view === 'form') {
        return (
            <div className="max-w-7xl mx-auto">
                <TestimonialForm 
                    testimonial={editingTestimonial} 
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
                    <h1 className="text-3xl font-black tracking-tight text-brand-green mb-2">Client Testimonials</h1>
                    <p className="text-brand-medium-gray dark:text-zinc-500 font-bold text-sm uppercase tracking-wider">
                        Manage customer feedback, success stories, and trust indicators.
                    </p>
                </div>
                <button 
                    onClick={handleAddNew}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-green text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </button>
            </div>

            {/* Toolbar */}
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                    type="text" 
                    placeholder="Search testimonials by name, role or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all shadow-sm"
                />
            </div>

            {/* Testimonial Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                    <Loader2 className="w-12 h-12 text-brand-green animate-spin mb-4" />
                    <p className="text-brand-medium-gray dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">Syncing Feedback...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm flex flex-col group hover:border-brand-green/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 relative rounded-full overflow-hidden border border-brand-soft-gray dark:border-zinc-800 bg-brand-light-gray dark:bg-zinc-900">
                                        {t.image ? (
                                            <Image src={t.image} alt={t.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-brand-green bg-brand-green/10">
                                                {t.name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{t.name}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-green">{t.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEdit(t)}
                                        className="p-2 rounded-lg bg-brand-light-gray dark:bg-zinc-900 text-brand-medium-gray hover:text-brand-green"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(t)}
                                        className="p-2 rounded-lg bg-brand-light-gray dark:bg-zinc-900 text-brand-medium-gray hover:text-red-500"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-0.5 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                                ))}
                            </div>

                            <Quote className="w-8 h-8 text-brand-green/10 mb-2" />
                            <p className="text-sm text-brand-medium-gray dark:text-zinc-400 line-clamp-4 italic flex-grow">
                                "{t.text}"
                            </p>
                        </div>
                    ))}
                    {filteredTestimonials.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                            <Quote className="w-12 h-12 mx-auto text-brand-soft-gray dark:text-zinc-800 mb-4" />
                            <p className="text-brand-medium-gray dark:text-zinc-500 font-bold">No testimonials found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
