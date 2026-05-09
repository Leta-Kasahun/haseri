"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, X, User, Loader2, CheckCheck, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { useChat } from "../hooks/useChat";
import { useAuth } from "@/src/hooks/useAuth";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../hooks/useChatStore";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: number;
  otherUser?: any;
}

export function ChatDialog({ isOpen, onClose, jobId, otherUser }: ChatDialogProps) {
  const { user } = useAuth();
  const { messages: allMessages, getMessages, send, markAsRead } = useChat(user?.id);
  const { fetchingMessages } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const otherId = otherUser?.id || otherUser?.user_id;
  const chatKey = jobId && otherId ? `${jobId}-${otherId}` : null;
  const currentMessages = chatKey ? allMessages[chatKey] || [] : [];
  const isLoading = chatKey ? fetchingMessages[chatKey] : false;

  useEffect(() => {
    if (isOpen && jobId && otherId) {
      getMessages(jobId.toString(), otherId.toString());
      markAsRead(jobId.toString());
    }
  }, [isOpen, jobId, otherId, getMessages, markAsRead]);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [currentMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !jobId || !otherId) return;

    const text = newMessage.trim();
    setNewMessage("");
    
    try {
      await send({
        job_id: jobId,
        receiver_id: otherId,
        message: text,
      });
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const getInitials = (userObj: any) => {
    if (!userObj) return "??";
    const first = userObj.first_name || userObj.name?.split(" ")[0] || "";
    const last = userObj.last_name || userObj.name?.split(" ")[1] || "";
    return (first.charAt(0) + last.charAt(0)).toUpperCase() || userObj.name?.charAt(0).toUpperCase() || "U";
  };

  if (!otherUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 border-none bg-transparent overflow-hidden rounded-[2rem] shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Chat with {otherUser?.name || 'User'}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[600px] bg-white dark:bg-slate-950 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between shadow-lg relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm ring-2 ring-primary/20 shadow-lg">
                  {getInitials(otherUser)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 shadow-sm" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight">{otherUser.name || 'User'}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Direct Message</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-950/30 custom-scrollbar"
          >
            {isLoading && currentMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : currentMessages.length > 0 ? (
              currentMessages.map((msg, idx) => {
                if (!msg) return null;
                const isMine = msg.sender_id === user?.id;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={msg.id || idx}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      isMine ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-[13px] leading-relaxed",
                      isMine 
                        ? "bg-primary text-white font-medium rounded-tr-none shadow-lg shadow-primary/10" 
                        : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none shadow-sm"
                    )}>
                      {msg.message}
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                        {msg.created_at ? format(new Date(msg.created_at), "HH:mm") : "..."}
                      </span>
                      {isMine && <CheckCheck size={10} className={msg.is_read ? "text-primary" : "text-slate-300"} />}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-30">
                <MessageSquare size={48} className="mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest">No history yet. Start the conversation.</p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-[12px] font-bold text-slate-900 dark:text-white"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim() || !otherId}
                className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-xl hover:bg-rose-700 transition-all disabled:opacity-30 disabled:grayscale"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
