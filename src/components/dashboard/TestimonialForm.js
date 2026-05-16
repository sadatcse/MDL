'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, ArrowLeft, Loader2, Upload, Star } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialForm({ testimonial, onSave, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        image: '',
        text: '',
        rating: 5
    });

    useEffect(() => {
        if (testimonial) {
            setFormData(testimonial);
        }
    }, [testimonial]);

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
            const url = testimonial ? `/api/testimonials/${testimonial.id}` : '/api/testimonials';
            const method = testimonial ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                onSave();
            } else {
                alert(result.error || 'Failed to save testimonial');
            }
        } catch (error) {
            console.error('Save failed:', error);
            alert('An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                        {testimonial ? 'Edit Testimonial' : 'New Testimonial'}
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
                        Save Testimonial
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Core Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Client Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Client Name *</label>
                                <input 
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Role / Designation</label>
                                <input 
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g. Business Consultant"
                                    className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-500">Testimonial Content *</label>
                            <textarea 
                                required
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Write the client's feedback here..."
                                className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all resize-none"
                            />
                        </div>
                    </section>
                </div>

                {/* Right Column: Media & Rating */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Client Photo
                        </h3>
                        <div className="relative group mx-auto w-32 h-32">
                            <div className={`w-32 h-32 rounded-full border-2 border-dashed border-brand-soft-gray dark:border-zinc-800 overflow-hidden flex items-center justify-center ${!formData.image && 'bg-brand-light-gray dark:bg-zinc-900'}`}>
                                {formData.image ? (
                                    <Image 
                                        src={formData.image} 
                                        alt="Client" 
                                        fill 
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <Upload className="w-8 h-8 text-zinc-400" />
                                )}
                                <label className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-all rounded-full">
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                    <div className="text-white text-[10px] font-bold uppercase">
                                        {uploading ? '...' : 'Upload'}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <p className="text-center text-[10px] text-zinc-500 font-bold uppercase mt-4 tracking-widest">Square photo recommended</p>
                    </section>

                    <section className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                            Rating
                        </h3>
                        <div className="flex items-center gap-2 justify-center py-4">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, rating: s }))}
                                    className={`p-1 transition-all ${s <= formData.rating ? 'text-amber-400 scale-110' : 'text-zinc-300 dark:text-zinc-800'}`}
                                >
                                    <Star className={`w-8 h-8 ${s <= formData.rating ? 'fill-current' : ''}`} />
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
