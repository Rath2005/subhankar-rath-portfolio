"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { useOS } from '../os/OSProvider';

export const ContactWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [booked, setBooked] = useState(false);

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];
  const days = ['Mon', 'Wed', 'Fri'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    // simulated send
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleBooking = () => {
    if (!selectedSlot) return;
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedSlot('');
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-300 text-xs">
      {/* Left Column: Form */}
      <div className="lg:col-span-6 space-y-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">GET IN TOUCH</span>
          <h2 className="text-xl font-bold text-white mt-0.5">Contact Port</h2>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-semibold text-slate-200">Message Transmitted!</h4>
            <p className="text-[10px] text-slate-400">Subhankar has received your ping and will reply within 12 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/[0.01] border border-white/[0.04] p-5 rounded-xl">
            <div className="space-y-1.5">
              <label className="font-mono text-slate-500 text-[10px] uppercase">Identity Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg p-2.5 outline-none text-slate-200 focus:border-white/20 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-slate-500 text-[10px] uppercase">Communication Email</label>
              <input
                type="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg p-2.5 outline-none text-slate-200 focus:border-white/20 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-slate-500 text-[10px] uppercase">Telemetry Message</label>
              <textarea
                placeholder="Write your transmission..."
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg p-2.5 outline-none text-slate-200 focus:border-white/20 transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-9 rounded-lg flex items-center justify-center space-x-2 text-black font-semibold hover:scale-102 active:scale-98 transition-all"
              style={{ backgroundColor: accentColor }}
            >
              <Send className="w-3.5 h-3.5" fill="black" />
              <span>TRANSMIT TELEMETRY</span>
            </button>
          </form>
        )}
      </div>

      {/* Right Column: Availability Calendar & Location */}
      <div className="lg:col-span-6 space-y-6">
        {/* Availability Scheduler */}
        <div className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-semibold text-slate-200 font-mono tracking-wider">CALENDAR BOOKING</h3>
          </div>

          {booked ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
              <h4 className="text-xs font-semibold text-slate-200 font-mono">SLOT ALLOCATED</h4>
              <p className="text-[9px] text-slate-500">Google Meet invite sent for {selectedDay} at {selectedSlot}.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Day filter */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Select Target Day</span>
                <div className="flex space-x-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1 rounded-lg border text-[10px] font-mono transition-all ${selectedDay === day ? 'bg-white/10 text-white border-white/25' : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300'}`}
                    >
                      {day.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot grid */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Select Time Window</span>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-lg border text-[10px] text-center font-mono transition-all ${selectedSlot === slot ? 'bg-white/10 text-white border-white/25' : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className="w-full h-8 rounded-lg border border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono tracking-wider flex items-center justify-center space-x-1.5 disabled:opacity-40 disabled:hover:border-cyan-500/30"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>CONFIRM BOOKING SESSION</span>
              </button>
            </div>
          )}
        </div>

        {/* Physical coordinates location */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-slate-500 uppercase">GEOGRAPHICAL COORDINATES</span>
            <p className="font-semibold text-slate-200 flex items-center">
              <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1.5" /> Bhubaneswar, Odisha, India
            </p>
          </div>
          <div className="text-right border-l border-white/10 pl-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase">STATUS INDICATOR</span>
            <p className="text-emerald-400 font-bold font-mono uppercase tracking-widest mt-0.5 animate-pulse">AVAILABLE</p>
          </div>
        </div>
      </div>
    </div>
  );
};
