"use client";

import React, { useState, useEffect } from "react";
import { Heading } from "@/src/features/shared/components";
import { Pencil, Check, Loader2, User, Phone, MapPin } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { useAuth } from "@/src/hooks/useAuth";

interface ProviderProfileDetailsProps {
  onSave: (data: Record<string, string>) => Promise<void>;
  isEmbedded?: boolean;
}

export function ProviderProfileDetails({ onSave, isEmbedded = false }: ProviderProfileDetailsProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        city: (user as any)?.address?.city || (user as any)?.city || "",
        sub_city: (user as any)?.address?.sub_city || (user as any)?.sub_city || "",
        woreda: (user as any)?.address?.woreda || (user as any)?.woreda || "",
        kebele: (user as any)?.address?.kebele || (user as any)?.kebele || "",
        specific_location: (user as any)?.address?.specific_location || (user as any)?.specific_location || "",
        label: (user as any)?.address?.label || "Workshop",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(formData);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const infoGroups = [
    {
      title: "Identity",
      icon: <User className="w-4 h-4 text-primary" />,
      fields: [
        { label: "First Name", value: formData.first_name },
        { label: "Last Name", value: formData.last_name },
      ]
    },
    {
      title: "Contact",
      icon: <Phone className="w-4 h-4 text-primary" />,
      fields: [
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
      ]
    },
    {
      title: "Address",
      icon: <MapPin className="w-4 h-4 text-primary" />,
      fields: [
        { label: "City", value: formData.city },
        { label: "Woreda", value: formData.woreda },
        { label: "Kebele", value: formData.kebele },
        { label: "Location", value: formData.specific_location },
      ]
    }
  ];

  return (
    <div className={`${isEmbedded ? "p-10" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none p-10 shadow-xl"} relative`}>
      
      {/* Clean Simple Pencil Icon */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="absolute top-8 right-10 text-slate-400 hover:text-primary transition-colors p-2">
            <Pencil className="w-5 h-5" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] rounded-none border-4 border-slate-900 p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">
              Edit <span className="text-primary">Profile</span> Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-8">
            <div className="space-y-4 md:col-span-2">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-2 border-b border-primary/20 pb-2">Personal info</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                  <Input name="first_name" value={formData.first_name} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                  <Input name="last_name" value={formData.last_name} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2 pt-4">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-2 border-b border-primary/20 pb-2">Contact details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</label>
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2 pt-4">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-2 border-b border-primary/20 pb-2">Location details</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">City</label>
                  <Input name="city" value={formData.city} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Woreda</label>
                  <Input name="woreda" value={formData.woreda} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kebele</label>
                  <Input name="kebele" value={formData.kebele} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sub City</label>
                  <Input name="sub_city" value={formData.sub_city} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specific Location</label>
                <Input name="specific_location" value={formData.specific_location} onChange={handleChange} className="h-12 rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold" />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="h-12 rounded-none border-2 border-slate-900 font-black uppercase tracking-widest text-[10px] px-8"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="h-12 bg-primary text-white hover:bg-rose-700 rounded-none font-black uppercase tracking-widest text-[10px] px-10"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
              Save Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {infoGroups.map((group, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b-4 border-slate-900">
              {group.icon}
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">{group.title}</h3>
            </div>
            <div className="space-y-6">
              {group.fields.map((field, fIdx) => (
                <div key={fIdx} className="flex items-baseline gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">{field.label}:</span>
                  <span className="text-[13px] font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                    {field.value || <span className="text-slate-200 italic">Not set</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
