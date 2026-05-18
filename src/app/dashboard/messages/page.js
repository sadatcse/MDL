'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  Search, 
  Loader2, 
  Calendar, 
  User, 
  ArrowRight, 
  Clock, 
  Inbox,
  X,
  ChevronRight
} from 'lucide-react';
import { showSuccess, showError, showConfirm } from '@/lib/sweetalert';

export default function DashboardMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (msg) => {
    const confirmed = await showConfirm(
      'Delete Message?',
      `Are you sure you want to delete the message from "${msg.name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/contacts/${msg.id}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      if (result.success) {
        showSuccess('Deleted!', 'The message has been deleted successfully.');
        if (selectedMessage?.id === msg.id) {
          setSelectedMessage(null);
        }
        fetchMessages();
      } else {
        showError('Failed to Delete', result.error || 'Failed to delete message');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      showError('Error', 'An error occurred while deleting.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.subject && m.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (m.message && m.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Statistics calculations
  const totalMessagesCount = messages.length;
  const messagesTodayCount = messages.filter(m => {
    if (!m.created_at) return false;
    const msgDate = new Date(m.created_at).toDateString();
    const today = new Date().toDateString();
    return msgDate === today;
  }).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-brand-green mb-2">Customer Messages</h1>
          <p className="text-brand-medium-gray dark:text-zinc-500 font-bold text-sm uppercase tracking-wider">
            View, read, and manage prospective buyer inquiries and contact leads.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-medium-gray dark:text-zinc-400 bg-brand-light-gray dark:bg-zinc-900 px-4 py-2 rounded-xl border border-brand-soft-gray dark:border-zinc-800">
          <Clock className="w-4 h-4 text-brand-green" />
          Realtime Feeds Active
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Total Messages */}
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm flex items-center justify-between overflow-hidden relative group">
          <div className="space-y-2 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500">Total Inquiries</p>
            <h3 className="text-4xl font-black text-brand-green leading-none">{totalMessagesCount}</h3>
            <p className="text-xs text-zinc-400 font-bold">Lifetime customer submissions</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-brand-green/5 border border-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
            <Mail className="w-8 h-8" />
          </div>
        </div>

        {/* Card 2: Today's Messages */}
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm flex items-center justify-between overflow-hidden relative group">
          <div className="space-y-2 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500">Inquiries Today</p>
            <h3 className="text-4xl font-black text-brand-green leading-none">{messagesTodayCount}</h3>
            <p className="text-xs text-zinc-400 font-bold">Submitted in the last 24 hours</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
            <Clock className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input 
          type="text" 
          placeholder="Search inquiries by client name, email, subject, or message content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all shadow-sm"
        />
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900">
          <Loader2 className="w-10 h-10 text-brand-green animate-spin mb-4" />
          <p className="text-sm text-brand-medium-gray font-bold uppercase tracking-wider animate-pulse">Loading Inquiries...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-950 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 flex items-center justify-center text-zinc-400 mb-6">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Inquiries Found</h3>
          <p className="text-sm text-brand-medium-gray dark:text-zinc-500 max-w-sm mx-auto leading-relaxed">
            {searchTerm ? "No messages match your active search terms. Try clearing the filters or searching for something else." : "You have not received any customer contact messages yet. Once someone fills out the public contact form, they will appear here!"}
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="mt-6 px-6 py-2 bg-brand-light-gray hover:bg-brand-green hover:text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMessages.map((msg) => (
            <div 
              key={msg.id}
              className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-brand-soft-gray dark:border-zinc-900 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4 border-b border-brand-light-gray dark:border-zinc-900 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                      <span className="font-extrabold text-brand-green text-sm uppercase">
                        {msg.name ? msg.name.slice(0, 2) : 'C'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground leading-snug truncate max-w-[140px]">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-xs text-brand-medium-gray hover:text-brand-green transition-colors truncate max-w-[140px] block">
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-green" />
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'Today'}
                    </div>
                  </div>
                </div>

                {/* Body info */}
                <div className="space-y-2 mt-4">
                  <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded tracking-widest leading-none inline-block">
                    {msg.subject ? msg.subject : 'General Inquiry'}
                  </span>
                  <p className="text-sm font-light text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed min-h-[60px]">
                    {msg.message ? msg.message : 'No message body provided.'}
                  </p>
                </div>
              </div>

              {/* Actions footer */}
              <div className="flex items-center justify-between border-t border-brand-light-gray dark:border-zinc-900 pt-4 mt-6">
                <button 
                  onClick={() => setSelectedMessage(msg)}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline uppercase tracking-wider"
                >
                  Read Message
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => handleDelete(msg)}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Immersive Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-900 rounded-[32px] shadow-2xl p-8 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button 
              onClick={() => setSelectedMessage(null)}
              className="absolute top-6 right-6 p-2 rounded-2xl bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 text-zinc-500 hover:text-brand-green hover:scale-105 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-brand-light-gray dark:border-zinc-900 pb-6 mb-6 pr-12">
              <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full tracking-widest leading-none mb-4 inline-block">
                {selectedMessage.subject ? selectedMessage.subject : 'General Inquiry'}
              </span>
              <h2 className="text-2xl font-black text-brand-green leading-snug mb-2">
                Inquiry Details
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs font-bold text-brand-medium-gray dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-green" />
                  Name: <span className="text-foreground">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-green" />
                  Email: <a href={`mailto:${selectedMessage.email}`} className="text-brand-green hover:underline">{selectedMessage.email}</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-green" />
                  Date: <span className="text-foreground">{formatDate(selectedMessage.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-brand-medium-gray dark:text-zinc-500">Message Content</p>
              <div className="bg-brand-light-gray dark:bg-zinc-900/50 p-6 rounded-2xl border border-brand-soft-gray dark:border-zinc-800 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-light">
                {selectedMessage.message ? selectedMessage.message : 'No message body provided.'}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-brand-light-gray dark:border-zinc-900 pt-6 mt-8">
              <button 
                onClick={() => handleDelete(selectedMessage)}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Trash2 className="w-4.5 h-4.5" />
                Delete Message
              </button>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2.5 bg-brand-green text-white hover:scale-105 active:scale-95 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
