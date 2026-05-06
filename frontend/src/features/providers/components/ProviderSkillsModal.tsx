"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Pencil, Plus, X, Loader2, Check } from "lucide-react";
import { providersApi } from "../services";
import { toast } from "react-hot-toast";

interface ProviderSkillsModalProps {
  initialSkills: string[];
  onUpdate: () => void;
  trigger?: React.ReactNode;
}

export function ProviderSkillsModal({ initialSkills, onUpdate, trigger }: ProviderSkillsModalProps) {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Logic for saving skills via API
      await providersApi.updateSkills(skills);
      toast.success("Skills updated successfully");
      onUpdate();
      setOpen(false);
    } catch {
      toast.error("Failed to update skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1.5 rounded-none text-slate-400 hover:text-primary transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-none border-4 border-slate-900 p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">
            Edit <span className="text-primary">Skills</span> Portfolio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add New Skill</label>
            <div className="flex gap-2">
              <Input 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                placeholder="e.g. Electrical, Plumbing..."
                className="rounded-none border-2 border-slate-200 focus:border-slate-900 font-bold h-12"
              />
              <Button onClick={handleAddSkill} className="rounded-none bg-slate-900 text-white h-12 px-6">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, i) => (
                  <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white group">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="text-slate-300 hover:text-rose-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-[10px] font-bold text-slate-400 uppercase italic">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-none border-2 border-slate-900 font-black uppercase tracking-widest text-[10px] h-12 px-8">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading} className="rounded-none bg-primary text-white hover:bg-rose-700 font-black uppercase tracking-widest text-[10px] h-12 px-10">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
            Save Skills
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
