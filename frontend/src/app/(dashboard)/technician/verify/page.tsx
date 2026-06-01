"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Section, Heading, LoadingSpinner } from "@/src/features/shared/components";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, CheckCircle2, Star, TrendingUp, Search, AlertCircle, Camera, UploadCloud, XCircle, FileText, Send } from "lucide-react";
import { useProviderVerification } from "@/src/features/providers/hooks/useProviderVerification";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { toast } from "react-hot-toast";

const TechnicianVerifyPage = () => {
  const { checkStatus, submit: submitVerification, loading: verificationLoading } = useProviderVerification();
  const [status, setStatus] = useState<{ 
    status: string; 
    verified_at: string | null;
    rejection_reason?: string | null;
    national_id_path?: string | null;
    proof_document_path?: string | null;
  } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // Re-upload state
  const [showReupload, setShowReupload] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const getStatus = useCallback(async () => {
    setIsRefreshing(true);
    const data = await checkStatus();
    setStatus(data);
    setIsRefreshing(false);
  }, [checkStatus]);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      const handleReady = () => {
        video.play().then(() => setIsCameraReady(true)).catch(console.error);
      };
      video.addEventListener('loadedmetadata', handleReady);
      return () => video.removeEventListener('loadedmetadata', handleReady);
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
    setIsCameraReady(false);
    setIsCameraOpen(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });
      setStream(s);
    } catch (err) {
      toast.error("Camera access failed");
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

  const handleResubmit = async () => {
    if (!idFile) return toast.error("Please provide your National ID");
    
    const fd = new FormData();
    fd.append("national_id", idFile);
    if (docFile) {
      fd.append("proof_document", docFile);
      fd.append("proof_document_type", "coc");
    }

    const success = await submitVerification(fd);
    if (success) {
      toast.success("Re-verification submitted!");
      setShowReupload(false);
      getStatus();
    }
  };

  const isPending = status?.status === "pending";
  const isApproved = status?.status === "approved";
  const isRejected = status?.status === "rejected";
  const isNotSubmitted = !status || status?.status === "not_submitted";


  if (isRefreshing) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10">
      <Container className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Verification Status Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl rounded-none space-y-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                isApproved ? "bg-green-100" : isRejected ? "bg-rose-100" : "bg-primary/10"
              )}>
                {isApproved ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : 
                 isRejected ? <AlertCircle className="w-6 h-6 text-rose-600" /> :
                 <Clock className="w-6 h-6 text-primary" />}
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">
                {isApproved ? "Profile Verified" : 
                 isRejected ? "Verification Rejected" : 
                 "Verification In Progress"}
              </h1>
            </div>
            
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed max-w-2xl">
              {isApproved ? "Congratulations! Your professional profile is now verified. You have full access to the Haseri marketplace." : 
               isRejected ? "Your verification request was not approved. Please review the details below and re-submit your documents." :
               "Thank you for providing your professional identity documents. Your verification request is currently being processed by our enterprise review team."}
            </p>

            {isRejected && status?.rejection_reason && (
              <div className="bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 p-6 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Rejection Reason</span>
                </div>
                <p className="text-[13px] font-bold text-rose-800 dark:text-rose-300 italic">
                  "{status.rejection_reason}"
                </p>
              </div>
            )}
          </div>

          {!showReupload && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6 border-t border-slate-100 dark:border-slate-800">
              {/* Timeline & Status */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black dark:text-white whitespace-nowrap">
                      Status Overview
                    </h3>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest">Current Status:</span>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                        isPending ? "bg-amber-100 text-amber-700" : isApproved ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                      )}>
                        {status?.status || "Processing"}
                      </span>
                    </div>
                    {(isRejected || isNotSubmitted) && (
                      <Button 
                        onClick={() => setShowReupload(true)}
                        className="w-full h-12 bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[9px] transition-all"
                      >
                        Re-Upload Documents
                      </Button>
                    )}

                </div>
              </div>

              {/* Verified Privileges */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-black dark:text-white whitespace-nowrap">
                      Verified Privileges
                    </h3>
                </div>
                <ul className="space-y-4">
                    {[
                      { icon: <Search className="w-3.5 h-3.5" />, text: "Priority Search Placement" },
                      { icon: <Star className="w-3.5 h-3.5" />, text: "Trust-Badge for Profile" },
                      { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Higher Trust Score & Ratings" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="text-primary">{item.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{item.text}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {/* Re-upload / Submission Section */}
          {(showReupload || isNotSubmitted) && (isRejected || isNotSubmitted) && (

            <div className="pt-10 border-t border-slate-100 dark:border-slate-800 space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <Heading level={3} className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">New Document Submission</Heading>
                <Button variant="ghost" onClick={() => setShowReupload(false)} className="text-[9px] font-black uppercase tracking-widest">Cancel</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ID Upload */}
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Step 1: National ID</span>
                  {isCameraOpen ? (
                    <div className="relative aspect-video bg-black border border-border overflow-hidden">
                      <video ref={videoRef} playsInline autoPlay className="w-full h-full object-cover" />
                      {!isCameraReady && <div className="absolute inset-0 flex items-center justify-center bg-background/90 text-foreground text-[9px] font-black uppercase">Warming Up...</div>}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
                        <Button onClick={handleCapture} disabled={!isCameraReady} className="rounded-full w-12 h-12 bg-white border-4 border-primary shadow-2xl" />
                        <Button onClick={stopCamera} className="rounded-full w-10 h-10 bg-slate-900"><XCircle className="w-5 h-5 text-white" /></Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      <button onClick={startCamera} className="h-32 border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group">
                        <Camera className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground/70">Take Photo</span>
                      </button>
                      <button onClick={() => idInputRef.current?.click()} className="h-32 border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group">
                        <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground/70">Upload File</span>
                      </button>
                    </div>
                  )}
                  <input ref={idInputRef} type="file" hidden accept="image/*" onChange={e => setIdFile(e.target.files?.[0] || null)} />
                  
                  {idFile && (
                    <div className="p-3 bg-primary/5 border border-primary/20 text-primary flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase truncate max-w-[150px]">{idFile.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setIdFile(null)}><XCircle className="w-4 h-4" /></Button>
                    </div>
                  )}
                </div>

                {/* Additional Docs */}
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Step 2: Proof Document (Optional)</span>
                  <div 
                    onClick={() => docInputRef.current?.click()} 
                    className="h-32 border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
                  >
                    <FileText className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground/70">
                      {docFile ? docFile.name : "Attach COC/License"}
                    </span>
                  </div>
                  <input ref={docInputRef} type="file" hidden accept=".pdf,image/*" onChange={e => setDocFile(e.target.files?.[0] || null)} />
                  
                  {docFile && (
                    <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-[10px] font-black uppercase truncate max-w-[150px]">{docFile.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setDocFile(null)}><XCircle className="w-4 h-4" /></Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button 
                  disabled={!idFile || verificationLoading}
                  onClick={handleResubmit}
                  className="w-full h-14 bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[11px] transition-all"
                >
                  {verificationLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit For Re-Verification
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
             <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-relaxed italic">
               {isApproved ? "Your verification status is active. You are now an elite professional on our platform." : 
                isRejected ? "Platform integrity is our top priority. Please ensure your documents are clear and legible for successful verification." :
                "While you wait, you can continue to refine your profile details and explore the latest available jobs on the marketplace."}
             </p>
          </div>
        </motion.div>
      </Container>
      <canvas ref={canvasRef} className="hidden" />
    </Section>
  );
};

export default TechnicianVerifyPage;
