"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Search, Clock, Check, ChevronRight, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useChat } from "../hooks/useChat";
import { useAuth } from "@/src/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChatDialog } from "./ChatDialog";

export function ChatCenter() {
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<{jobId: number, otherUser: any} | null>(null);
  const { user } = useAuth();
  const { 
    conversations, 
    unreadCount, 
    loading, 
    getConversations, 
    getUnreadCount 
  } = useChat(user?.id);

  useEffect(() => {
    if (!user) return;
    getUnreadCount();
  }, [user, getUnreadCount]);

  useEffect(() => {
    if (open) {
      getConversations();
    }
  }, [open, getConversations]);

  const getInitials = (userObj: any) => {
    if (!userObj) return "??";
    const first = userObj.first_name || userObj.name?.split(" ")[0] || "";
    const last = userObj.last_name || userObj.name?.split(" ")[1] || "";
    return (first.charAt(0) + last.charAt(0)).toUpperCase() || userObj.name?.charAt(0).toUpperCase() || "U";
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button 
            className={cn(
              "relative p-2.5 rounded-xl transition-all duration-300",
              open 
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg" 
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
            aria-label="Messages"
          >
            <MessageSquare size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white ring-2 ring-white dark:ring-slate-950 shadow-sm animate-in zoom-in duration-300">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          align="end" 
          sideOffset={12} 
          className="z-50 w-[min(26rem,calc(100vw-2rem))] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl p-0 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Message Hub</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {unreadCount > 0 ? `${unreadCount} Active conversations` : "No pending messages"}
                </p>
              </div>
            </div>
          </div>

          {/* List Area */}
          <div className="max-h-[420px] overflow-y-auto custom-scrollbar p-3 space-y-3 bg-slate-50/30 dark:bg-slate-950/30">
            {loading && conversations.length === 0 ? (
              <div className="p-16 flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing...</span>
              </div>
            ) : conversations.length > 0 ? (
              <div className="space-y-3">
                {conversations.map((chat) => {
                  if (!chat) return null;
                  return (
                    <motion.div 
                    layout
                    key={`${chat.job_id}-${chat.other_user.id}`}
                    onClick={() => {
                      setSelectedChat({ jobId: chat.job_id, otherUser: chat.other_user });
                      setOpen(false);
                    }}
                    className={cn(
                      "group p-4 rounded-2xl transition-all relative border-none cursor-pointer",
                      "bg-white dark:bg-slate-900",
                      "hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 hover:-translate-y-1 hover:ring-2 hover:ring-primary/20 hover:bg-primary/[0.01] dark:hover:bg-primary/[0.03]",
                      chat.unread_count > 0 ? "ring-2 ring-primary/10 shadow-md" : "opacity-95"
                    )}
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0 relative">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black text-[10px] tracking-widest border border-slate-200 dark:border-slate-700">
                          {getInitials(chat.other_user)}
                        </div>
                        {chat.unread_count > 0 && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white dark:border-slate-900" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-black uppercase tracking-wider truncate pr-2 text-slate-900 dark:text-white">
                            {chat.other_user.name}
                          </span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 shrink-0">
                            <Clock size={10} />
                            {formatDistanceToNow(new Date(chat.last_message.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-600 dark:text-slate-400 truncate pr-4 italic">
                          {chat.last_message.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </div>
            ) : (
              <div className="p-20 flex flex-col items-center gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-200 shadow-sm">
                  <MessageSquare size={32} className="opacity-20" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-2">No Conversations</h4>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Start a chat from a job application</p>
                </div>
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChatDialog 
        isOpen={!!selectedChat} 
        onClose={() => setSelectedChat(null)} 
        jobId={selectedChat?.jobId} 
        otherUser={selectedChat?.otherUser} 
      />
    </>
  );
}
