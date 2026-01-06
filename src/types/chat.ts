export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: number;
};

export type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
};
