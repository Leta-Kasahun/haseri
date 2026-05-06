"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Section, Heading, LoadingSpinner } from "@/src/features/shared/components";
import { 
  ShieldCheck, 
  MapPin, 
  Camera, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  UploadCloud, 
  FileText,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/hooks/useAuth";
import { useProviderProfile } from "../hooks/useProviderProfile";
import { useProviderVerification } from "../hooks/useProviderVerification";
import { toast } from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function TechnicianOnboarding() {
  const { user } = useAuth();
  const router = useRouter();
  const { update: updateProfile, loading: profileLoading } = useProviderProfile();
  const { submit: submitVerification, loading: verificationLoading } = useProviderVerification();
  
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ 
    city: "", 
    woreda: "", 
    kebele: "", 
    specific_location: "", 
    label: "Workshop" 
  });
  
  const [idFile, setIdFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((user as any)?.address) {
      setAddress(prev => ({ ...prev, ...(user as any).address }));
    }
  }, [user]);

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      const handleReady = () => {
        video.play().then(() => setIsCameraReady(true)).catch(console.error);
      };
      video.addEventListener('loadedmetadata', handleReady);
      video.addEventListener('playing', handleReady);
      return () => {
        video.removeEventListener('loadedmetadata', handleReady);
        video.removeEventListener('playing', handleReady);
      };
    }
  }, [isCameraOpen, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setIsCameraReady(false);
  }, [stream]);

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraReady(false);
    setIsCameraOpen(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: "environment" } } 
      });
      setStream(s);
    } catch (err) {
      setCameraError("Camera access failed");
      setIsCameraOpen(false);
    }
  };

  const handleCapture = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")?.drawImage(v, 0, 0);
    c.toBlob(blob => {
      if (blob) setIdFile(new File([blob], `id-${Date.now()}.jpg`, { type: "image/jpeg" }));
      stopCamera();
    }, "image/jpeg", 0.9);
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!address.city || !address.woreda) return toast.error("City and Woreda are required");
      const success = await updateProfile(address);
      if (success) setStep(2);
    } else if (step === 2) {
      if (!idFile) return toast.error("Please provide your National ID");
      setStep(3);
    } else if (step === 3) {
      const fd = new FormData();
      fd.append("national_id", idFile);
      if (docFile) {
        fd.append("proof_document", docFile);
        fd.append("proof_document_type", "coc");
      }
      
      const success = await submitVerification(fd);
      if (success) {
        toast.success("Identity verified!");
        router.push("/technician/profile");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Section className="flex-grow flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6">
        <Container className="max-w-xl">
          <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-12 space-y-10">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Security Setup</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{step}/3</span>
              </div>
              <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
                Technician <span className="italic text-primary">Identity</span>
              </h1>
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={cn("h-1.5 flex-1 border-2 border-slate-900 transition-all duration-500", 
                    step >= s ? "bg-primary" : "bg-slate-100 dark:bg-slate-800"
                  )} />
                ))}
              </div>
            </div>

            <div className="min-h-[340px]">
              {step === 1 ? (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Workspace Details</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="City *" className="h-14 border-2 border-slate-900 rounded-none font-bold" />
                    <Input value={address.woreda} onChange={e => setAddress({...address, woreda: e.target.value})} placeholder="Woreda *" className="h-14 border-2 border-slate-900 rounded-none font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={address.kebele} onChange={e => setAddress({...address, kebele: e.target.value})} placeholder="Kebele" className="h-14 border-2 border-slate-900 rounded-none font-bold" />
                    <Input value={address.specific_location} onChange={e => setAddress({...address, specific_location: e.target.value})} placeholder="Location" className="h-14 border-2 border-slate-900 rounded-none font-bold" />
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest">National ID Verification</p>
                  </div>
                  
                  {isCameraOpen ? (
                    <div className="relative aspect-video bg-black border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                      <video ref={videoRef} playsInline autoPlay className="w-full h-full object-cover" />
                      {!isCameraReady && <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 text-white text-[9px] font-black uppercase">Warming Up...</div>}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
                        <Button onClick={handleCapture} disabled={!isCameraReady} className="rounded-full w-16 h-16 bg-white border-8 border-primary shadow-2xl" />
                        <Button onClick={stopCamera} className="rounded-full w-12 h-12 bg-slate-900 border-2 border-primary"><XCircle className="w-6 h-6 text-white" /></Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button onClick={startCamera} className="h-40 border-4 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-4 group">
                        <Camera className="w-7 h-7 text-slate-400 group-hover:text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Take Live ID Photo</span>
                      </button>
                      <button onClick={() => idInputRef.current?.click()} className="h-40 border-4 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-4 group">
                        <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Upload National ID</span>
                      </button>
                    </div>
                  )}
                  
                  <input ref={idInputRef} type="file" hidden accept="image/*" onChange={e => setIdFile(e.target.files?.[0] || null)} />
                  
                  {idFile && (
                    <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 text-emerald-700 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-[11px] font-black uppercase truncate max-w-[200px]">{idFile.name}</span>
                      </div>
                      <Button variant="ghost" onClick={() => setIdFile(null)}><XCircle className="w-5 h-5" /></Button>
                    </div>
                  )}

                  <div className="pt-6 border-t-2 border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Other Documentation (Optional)</p>
                    <Button variant="outline" onClick={() => docInputRef.current?.click()} className="w-full h-16 border-2 border-slate-900 rounded-none bg-slate-50 flex justify-between px-6">
                      <span className="text-[10px] font-black uppercase tracking-widest">{docFile ? docFile.name : "Attach COC/License"}</span>
                      <UploadCloud className="w-4 h-4 text-slate-300" />
                    </Button>
                    <input ref={docInputRef} type="file" hidden accept=".pdf,image/*" onChange={e => setDocFile(e.target.files?.[0] || null)} />
                  </div>
                </div>
              ) : step === 3 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Review Submission</p>
                  </div>
                  <div className="border-4 border-slate-900 p-8 space-y-6 bg-slate-50/50">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Location</p>
                        <p className="text-sm font-black uppercase tracking-tight">{address.city}, {address.woreda}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <FileText className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Documents</p>
                        <p className="text-sm font-black uppercase tracking-tight truncate max-w-[240px]">{idFile?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 h-16 border-4 border-slate-900 rounded-none font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-3" /> Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                disabled={profileLoading || verificationLoading}
                className="flex-[2] h-16 bg-slate-900 hover:bg-slate-800 text-white border-4 border-slate-900 rounded-none font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:-translate-y-1"
              >
                {profileLoading || verificationLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <span>{step === 3 ? "Submit Identity" : "Continue"}</span>
                    <ArrowRight className="w-4 h-4 ml-3" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <footer className="py-8 px-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">H</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              &copy; {new Date().getFullYear()} Haseri. Secure Identity Portal.
            </span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="/help" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Support</Link>
          </div>
        </div>
      </footer>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
