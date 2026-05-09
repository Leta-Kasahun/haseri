export type Message = {
  id: number;
  job_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  is_read: boolean;
  sender: {
    id: number;
    name: string;
    avatar: string | null;
  };
  created_at: string;
};

export type SendMessageInput = {
  job_id: number;
  receiver_id: number;
  message: string;
};

export type Conversation = {
  job_id: number;
  other_user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  last_message: Message;
  unread_count: number;
};