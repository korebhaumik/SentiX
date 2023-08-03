"use client";
import React from "react";
import { useAi } from "@/context/Ai.context";

type Props = {};

export default function Result({}: Props) {
  const { messages } = useAi();
  //   console.log(messages);
  return (
    <div
      className="max-w-2xl px-5 pb-10 mx-auto flex flex-col-reverse scroll-auto"
      id="content"
    >
      {messages.map((message, index) => {
        if (message.role === "user") return;
        if (index !== messages.length - 1) return;
        return (
          <div className="" key={Math.random()}>
            <p className="text-gray-700">{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}
