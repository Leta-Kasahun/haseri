import { create } from "zustand";
import { chatApi } from "../services";

interface ChatStore {
  unreadCount: number;
  conversations: any[];
  messages: Record<string, any[]>; // Key: jobId-otherUserId
  isFetchingUnread: boolean;
  fetchingMessages: Record<string, boolean>;
  setUnreadCount: (count: number) => void;
  setConversations: (conversations: any[]) => void;
  fetchUnreadCount: () => Promise<void>;
  fetchConversations: () => Promise<void>;
  fetchMessages: (jobId: string, otherUserId: string) => Promise<void>;
  addMessage: (jobId: string, otherUserId: string, message: any) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  unreadCount: 0,
  conversations: [],
  messages: {},
  isFetchingUnread: false,
  fetchingMessages: {},
  
  setUnreadCount: (count) => set({ unreadCount: count }),
  setConversations: (conversations) => set({ conversations }),
  
  fetchUnreadCount: async () => {
    if (get().isFetchingUnread) return;
    set({ isFetchingUnread: true });
    try {
      const res = await chatApi.getUnreadCount();
      set({ unreadCount: res.data?.data?.count ?? 0 });
    } catch (error) {
      console.error("ChatStore: Failed to fetch unread count", error);
    } finally {
      set({ isFetchingUnread: false });
    }
  },
  
  fetchConversations: async () => {
    try {
      const res = await chatApi.getConversations();
      set({ conversations: res.data?.data || [] });
    } catch (error) {
      console.error("ChatStore: Failed to fetch conversations", error);
    }
  },
  
  fetchMessages: async (jobId, otherUserId) => {
    const key = `${jobId}-${otherUserId}`;
    if (get().fetchingMessages[key]) return;
    
    set((state) => ({ 
      fetchingMessages: { ...state.fetchingMessages, [key]: true } 
    }));
    
    try {
      const res = await chatApi.getMessages(jobId, otherUserId);
      set((state) => ({
        messages: { ...state.messages, [key]: res.data?.data || [] }
      }));
    } catch (error) {
      console.error("ChatStore: Failed to fetch messages", error);
    } finally {
      set((state) => ({ 
        fetchingMessages: { ...state.fetchingMessages, [key]: false } 
      }));
    }
  },

  addMessage: (jobId, otherUserId, message) => {
    const key = `${jobId}-${otherUserId}`;
    set((state) => {
      const currentMessages = state.messages[key] || [];
      const exists = currentMessages.find(m => m.id === message.id);
      if (exists) return state;
      return {
        messages: { ...state.messages, [key]: [...currentMessages, message] }
      };
    });
  }
}));
