"use client";

import { useCallback, useEffect } from "react";
import { pusherClient } from "@/src/lib/pusher/pusherClient";
import { chatApi } from "../services";
import { useChatStore } from "./useChatStore";
import type { Message, SendMessageInput } from "../types";

export const useChat = (userId?: number) => {
  const { 
    unreadCount, 
    conversations, 
    messages, 
    fetchUnreadCount, 
    fetchConversations, 
    fetchMessages,
    addMessage 
  } = useChatStore();

  const getUnreadCount = useCallback(async () => {
    if (!userId) return;
    await fetchUnreadCount();
  }, [userId, fetchUnreadCount]);

  const getConversations = useCallback(async () => {
    if (!userId) return;
    await fetchConversations();
  }, [userId, fetchConversations]);

  const getMessages = useCallback(async (jobId: string, otherUserId: string) => {
    await fetchMessages(jobId, otherUserId);
  }, [fetchMessages]);

  const send = async (data: SendMessageInput) => {
    const res = await chatApi.send(data);
    const newMessage = res.data.data;
    if (newMessage) {
      addMessage(data.job_id.toString(), data.receiver_id.toString(), newMessage);
    }
    return newMessage;
  };

  const markAsRead = async (jobId: string) => {
    try {
      await chatApi.markAsRead(jobId);
      fetchUnreadCount();
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  useEffect(() => {
    if (!userId || !pusherClient) return;

    const channel = pusherClient.subscribe(`chat.${userId}`);
    
    channel.bind("new-message", (message: Message) => {
      if (message) {
        // Determine the "key" for this message to store it correctly
        const isMine = message.sender_id === userId;
        const otherUserId = isMine ? message.receiver_id : message.sender_id;
        
        addMessage(message.job_id.toString(), otherUserId.toString(), message);
        fetchConversations();
        fetchUnreadCount();
      }
    });

    return () => {
      pusherClient?.unsubscribe(`chat.${userId}`);
    };
  }, [userId, fetchConversations, fetchUnreadCount, addMessage]);

  return { 
    messages, // Note: This is now the global Record, components need to pick their messages
    conversations, 
    unreadCount, 
    getMessages, 
    getConversations, 
    getUnreadCount, 
    send, 
    markAsRead 
  };
};