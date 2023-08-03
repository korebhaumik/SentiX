"use client";
import { ChatRequestOptions } from "ai";
import { type Message, useChat, CreateMessage } from "ai/react";
import { useContext, createContext } from "react";

type IContext = {
  messages: Message[];
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => Promise<string | null | undefined>;
  isLoading: boolean;
};

const AiContext = createContext<IContext>({
  messages: [],
  append: () => Promise.resolve(null),
  isLoading: false,
});

export const AiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { append, messages, isLoading } = useChat({
    api: "/api/ai",
  });

  return (
    <AiContext.Provider
      value={{
        messages,
        append,
        isLoading,
      }}
    >
      {children}
    </AiContext.Provider>
  );
};
export const useAi = () => useContext(AiContext);
