'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, ArrowLeft, Loader2, Upload, Calendar as CalendarIcon, Type, Globe } from 'lucide-react';
import Image from 'next/image';

export default function UpdateForm({ update, onSave, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Media',
        source: '',
        date: '',
        image: '',
        excerpt: '',
        content: ''
    });

    useEffect(() => {
        if (update) {
            setFormData(update);
        } else {
            // Set default date if new
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
            setFormData(prev => ({ ...prev, date: formattedDate }));
        }
    }, [update]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            
            if (result.success) {
                setFormData(prev => ({ ...prev, image: result.url }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = update ? `/api/updates/${update.id}` : '/api/updates';
            const method = update ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                onSave();
            } else {
                alert(result.error || 'Failed to save update');
            }
        } catch (error) {
            console.error('Save failed:', error);
            alert('An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Actions */}
            <div className="flex items-center justify-between sticky top-0 z-30 bg-[#F8F9FA]/80 dark:bg-black/80 backdrop-blur-xl py-4 border-b border-brand-soft-gray dark:border-zinc-800">
                <div className="flex items-center gap-4">
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="p-2 rounded-xl hover:bg-brand-light-gray dark:hover:bg-zinc-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-black tracking-tight text-brand-green">
                        {update ? 'Edit Media/Event' : 'New Media/Event'}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-xl border border-brand-soft-gray dark:border-zinc-800 font-bold text-sm hover:bg-brand-light-gray dark:hover:bg-zinc-900 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-brand-green text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Update
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Primary Information
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Title / Headline *</label>
                                <input 
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. MDL Wins Excellence Award"
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Source / Publisher</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <input 
                                            name="source"
                                            value={formData.source}
                                            onChange={handleChange}
                                            placeholder="e.g. Daily Star"
                                            className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Date Display</label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <input 
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            placeholder="e.g. May 15, 2026"
                                            className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Summary / Excerpt</label>
                                <textarea 
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Brief summary for the listing page..."
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Article Content (HTML supported)</label>
                                <textarea 
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={15}
                                    placeholder="Write the full article content here..."
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Settings */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Featured Image
                        </h3>
                        <div className="relative group aspect-video bg-brand-light-gray dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-brand-soft-gray dark:border-zinc-800 overflow-hidden flex items-center justify-center">
                            {formData.image ? (
                                <Image 
                                    src={formData.image} 
                                    alt="Featured" 
                                    fill 
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            ) : (
                                <Upload className="w-8 h-8 text-zinc-400" />
                            )}
                            <label className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-all">
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                                <div className="text-white text-xs font-bold uppercase tracking-wider">
                                    {uploading ? 'Uploading...' : 'Click to Upload'}
                                </div>
                            </label>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-4 tracking-widest text-center">16:9 Aspect Ratio Recommended</p>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Classification
                        </h3>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Update Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Media', 'Event'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, type: t }))}
                                        className={`py-3 px-4 rounded-xl font-bold text-xs transition-all ${formData.type === t ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-brand-light-gray dark:bg-zinc-900 text-brand-medium-gray border border-brand-soft-gray dark:border-zinc-800'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
