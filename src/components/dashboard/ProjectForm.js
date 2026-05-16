'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, Loader2, Save, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function ProjectForm({ project, onSave, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        project_name: '',
        developer: '',
        project_address: '',
        google_map_url: '',
        latitude: '',
        longitude: '',
        photo_thumbnail: '',
        project_status: 'ongoing',
        project_type: 'Residential',
        city: 'Dhaka',
        area: '',
        postal_code: '',
        total_floors: '',
        total_units: '',
        year_started: '',
        year_completion: '',
        description: '',
        flat_size: '',
        price_range: '',
        brochure_url: '',
        project_url: '',
        for_sale: true,
        registration_open: false,
        photos: [],
        amenities: [],
        features: [],
        flat_types: []
    });

    useEffect(() => {
        if (project) {
            // Parse JSON fields if they are strings (from DB)
            const parseJson = (field) => {
                if (typeof field === 'string') {
                    try { return JSON.parse(field); } catch (e) { return []; }
                }
                return field || [];
            };

            setFormData({
                ...project,
                photos: parseJson(project.photos),
                amenities: parseJson(project.amenities),
                features: parseJson(project.features),
                flat_types: parseJson(project.flat_types)
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayAdd = (field, value) => {
        if (!value) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value]
        }));
    };

    const handleArrayRemove = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = async (e, field) => {
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
                if (field === 'photo_thumbnail') {
                    setFormData(prev => ({ ...prev, photo_thumbnail: result.url }));
                } else if (field === 'photos') {
                    setFormData(prev => ({ ...prev, photos: [...prev.photos, result.url] }));
                }
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleBulkFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        
        for (const file of files) {
            const data = new FormData();
            data.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: data
                });
                const result = await res.json();
                
                if (result.success) {
                    setFormData(prev => ({ 
                        ...prev, 
                        photos: [...prev.photos, result.url] 
                    }));
                }
            } catch (error) {
                console.error('Upload failed for file:', file.name, error);
            }
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = project ? `/api/projects/${project.slug || project.id}` : '/api/projects';
            const method = project ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                onSave();
            } else {
                alert(result.error || 'Failed to save project');
            }
        } catch (error) {
            console.error('Save failed:', error);
            alert('An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                        {project ? 'Edit Project' : 'New Project'}
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
                        Save Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Core Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Project Name *</label>
                                <input 
                                    required
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Aurora Heights"
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Developer</label>
                                <input 
                                    name="developer"
                                    value={formData.developer}
                                    onChange={handleChange}
                                    placeholder="e.g. Zenith Properties"
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Project Type</label>
                                <select 
                                    name="project_type"
                                    value={formData.project_type}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                >
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Industrial">Industrial</option>
                                    <option value="Mixed-use">Mixed-use</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Project Status</label>
                                <select 
                                    name="project_status"
                                    value={formData.project_status}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="ready">Ready</option>
                                    <option value="handovered">Handovered</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Description</label>
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the project's unique selling points..."
                                className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all resize-none"
                            />
                        </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Location Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-3 space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Full Address</label>
                                <input 
                                    name="project_address"
                                    value={formData.project_address}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">City</label>
                                <input 
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Area</label>
                                <input 
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Postal Code</label>
                                <input 
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                                Unit/Flat Types
                            </h3>
                            <button 
                                type="button"
                                onClick={() => handleArrayAdd('flat_types', { type: '', size_sqft: '', bedrooms: '', bathrooms: '' })}
                                className="text-brand-green hover:bg-brand-green/10 p-2 rounded-xl transition-all"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.flat_types.map((flat, idx) => (
                                <div key={idx} className="flex gap-4 items-end bg-brand-light-gray dark:bg-zinc-900 p-4 rounded-2xl border border-brand-soft-gray dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-zinc-400">Type</label>
                                            <input 
                                                value={flat.type} 
                                                onChange={(e) => {
                                                    const newFlats = [...formData.flat_types];
                                                    newFlats[idx].type = e.target.value;
                                                    setFormData(prev => ({ ...prev, flat_types: newFlats }));
                                                }}
                                                placeholder="A"
                                                className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-lg py-1.5 px-3 text-xs focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-zinc-400">Size (Sqft)</label>
                                            <input 
                                                type="number"
                                                value={flat.size_sqft} 
                                                onChange={(e) => {
                                                    const newFlats = [...formData.flat_types];
                                                    newFlats[idx].size_sqft = e.target.value;
                                                    setFormData(prev => ({ ...prev, flat_types: newFlats }));
                                                }}
                                                className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-lg py-1.5 px-3 text-xs focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-zinc-400">Beds</label>
                                            <input 
                                                type="number"
                                                value={flat.bedrooms} 
                                                onChange={(e) => {
                                                    const newFlats = [...formData.flat_types];
                                                    newFlats[idx].bedrooms = e.target.value;
                                                    setFormData(prev => ({ ...prev, flat_types: newFlats }));
                                                }}
                                                className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-lg py-1.5 px-3 text-xs focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-zinc-400">Baths</label>
                                            <input 
                                                type="number"
                                                value={flat.bathrooms} 
                                                onChange={(e) => {
                                                    const newFlats = [...formData.flat_types];
                                                    newFlats[idx].bathrooms = e.target.value;
                                                    setFormData(prev => ({ ...prev, flat_types: newFlats }));
                                                }}
                                                className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-lg py-1.5 px-3 text-xs focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => handleArrayRemove('flat_types', idx)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {formData.flat_types.length === 0 && (
                                <p className="text-center py-10 text-brand-medium-gray dark:text-zinc-500 text-sm border-2 border-dashed border-brand-soft-gray dark:border-zinc-900 rounded-2xl">
                                    No unit types added yet. Click + to add one.
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Media & Specs */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Thumbnail
                        </h3>
                        <div className="relative group">
                            <div className={`aspect-[330/180] rounded-2xl border-2 border-dashed border-brand-soft-gray dark:border-zinc-800 overflow-hidden flex items-center justify-center ${!formData.photo_thumbnail && 'bg-brand-light-gray dark:bg-zinc-900'}`}>
                                {formData.photo_thumbnail ? (
                                    <Image 
                                        src={formData.photo_thumbnail} 
                                        alt="Thumbnail" 
                                        fill 
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Upload</p>
                                    </div>
                                )}
                                <label className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-all">
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'photo_thumbnail')}
                                    />
                                    <div className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                                        {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                        {formData.photo_thumbnail ? 'Change Image' : 'Upload Image'}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                                Project Gallery
                            </h3>
                            {formData.photos.length > 0 && (
                                <button 
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, photos: [] }))}
                                    className="text-xs font-bold text-red-500 hover:underline"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {formData.photos.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-brand-soft-gray dark:border-zinc-800">
                                    <Image 
                                        src={url} 
                                        alt={`Gallery ${idx}`} 
                                        fill 
                                        className="object-cover"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => handleArrayRemove('photos', idx)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <label className="aspect-square rounded-xl border-2 border-dashed border-brand-soft-gray dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-light-gray dark:hover:bg-zinc-900 transition-all">
                                <input 
                                    type="file" 
                                    multiple 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleBulkFileUpload}
                                />
                                <Plus className="w-6 h-6 text-zinc-400 mb-1" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Add Photos</span>
                            </label>
                        </div>
                        
                        {uploading && (
                            <div className="flex items-center gap-2 text-brand-green text-xs font-bold animate-pulse">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Uploading gallery photos...
                            </div>
                        )}
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Specifications
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Year Started</label>
                                <input 
                                    type="number"
                                    name="year_started"
                                    value={formData.year_started}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Year Completion</label>
                                <input 
                                    type="number"
                                    name="year_completion"
                                    value={formData.year_completion}
                                    onChange={handleChange}
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-6 p-4 bg-brand-light-gray dark:bg-zinc-900 rounded-2xl border border-brand-soft-gray dark:border-zinc-800">
                                <input 
                                    type="checkbox"
                                    id="for_sale"
                                    name="for_sale"
                                    checked={formData.for_sale}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded-lg border-brand-soft-gray text-brand-green focus:ring-brand-green/20"
                                />
                                <label htmlFor="for_sale" className="text-sm font-bold cursor-pointer">Available for Sale</label>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                                Amenities
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.amenities.map((item, idx) => (
                                <span key={idx} className="bg-brand-green/10 text-brand-green px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-brand-green/20">
                                    {item}
                                    <button onClick={() => handleArrayRemove('amenities', idx)}><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input 
                                id="new_amenity"
                                placeholder="e.g. Gym"
                                className="flex-1 bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-xl py-2 px-3 text-sm focus:outline-none"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleArrayAdd('amenities', e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button 
                                type="button"
                                onClick={() => {
                                    const input = document.getElementById('new_amenity');
                                    handleArrayAdd('amenities', input.value);
                                    input.value = '';
                                }}
                                className="bg-brand-green text-white p-2 rounded-xl"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
