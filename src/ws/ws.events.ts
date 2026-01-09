export const WS_EVENTS = {
  JOIN_ROOM: "JOIN_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
  SEND_MESSAGE: "SEND_MESSAGE",
  NEW_MESSAGE: "NEW_MESSAGE",
  USER_JOINED: "USER_JOINED",
  USER_LEFT: "USER_LEFT",
  ERROR: "ERROR",
} as const;

export type WSEventPayloadMap = {
  JOIN_ROOM: {
    roomId: string;
  };

  LEAVE_ROOM: {
    roomId: string;
  };

  SEND_MESSAGE: {
    roomId: string;
    clientMessageId: string;
    text: string;
    createdAt: number;
  };

  NEW_MESSAGE: {
    roomId: string;
    messageId: string;
    senderId: string;
    text: string;
    createdAt: number;
  };

  USER_JOINED: {
    roomId: string;
    userId: string;
  };

  USER_LEFT: {
    roomId: string;
    userId: string;
  };

  ERROR: {
    code: string;
    message: string;
  };
};

export type WSEventType = keyof WSEventPayloadMap;

// this is not union discriminant

// {
//   type : A | B | C,  ---- this in itself is UD but not with payload
//   payload : PA | PB | PC
// }
// export type WSMessage<K extends WSEventType = WSEventType> = {
//   type: K;
//   payload: WSEventPayloadMap[K];
//   meta?: {
//     timestamp?: number;
//     userId?: string;
//   };
// };

// real UD
// WSMESSAGE = | {} | {type , payload} | {}

export type WSMessage = {
  [K in WSEventType]: {
    type: K;
    payload: WSEventPayloadMap[K];
    meta?: {
      userId?: string;
      timestamp?: number;
    };
  };
}[WSEventType];
