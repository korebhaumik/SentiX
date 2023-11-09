"use client";
import React, { useState } from "react";
import Note from "./Note";
import { useAi } from "@/context/Ai.context";
import cn from "@/lib/utils";

type Props = {
  activeTab: string;
};

export default function Input({ activeTab }: Props) {
  const [temp, setTemp] = useState<string>("");
  const [tweet, setTweet] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const { append, isLoading } = useAi();
  const handleSumbitTweet = async () => {
    if (tweet == "") return;
    setTemp("");
    await append({
      content: tweet,
      role: "user",
    });
  };
  const handleSumbitHashtag = async () => {
    if (!hashtag) return;
    setTemp("");
    await append({
      content: hashtag,
      role: "user",
    });
  };
  const handleSumbitHandle = async () => {
    if (!handle) return;
    let tweetsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${handle}`
    );
    let tweets: string[] = await tweetsRes.json();
    setTemp("");
    await append({
      content: JSON.stringify({ handle, tweets: tweets.slice(0,10) }),
      role: "user",
    });
  };

  return (
    <main>
      {/* tweet */}
      {activeTab === "tweet" && (
        <section className="my-5">
          <p className="flex items-center">
            <span className="w-7 h-7 text-center pt-0.5 text-white bg-black rounded-full">
              1
            </span>
            <span className="text-black text-base  tracking-tight mx-1">
              Copy the tweet
            </span>
            <span className="text-zinc-500 text-base  tracking-tight">
              ( or write a few words )
            </span>
          </p>
          <textarea
            value={temp}
            onChange={(e) => {
              setTemp(e.target.value);
              setTweet(e.target.value);
            }}
            className="w-full p-3 mt-3 h-[6.25rem] outline-black rounded-lg resize-none border-2 border-zinc-200"
            placeholder="e.g. Yes, we know. Everyone likes coffee. You’re probably not even a “real writer” if you don’t have coffee siphoned down your throat as a form of alarm clock."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) return;
                e.preventDefault();
                handleSumbitTweet();
              }
            }}
          />
          <button
            onClick={handleSumbitTweet}
            disabled={isLoading}
            className={cn("w-full mt-2 bg-black text-white py-4 rounded-lg", {
              "bg-black/50": isLoading,
            })}
          >
            {!isLoading ? "Generate Analysis" : "Generating..."}
          </button>
        </section>
      )}
      {/* Handle */}
      {activeTab === "handle" && (
        <section className="my-5">
          <Note
            message="Due to unavaibility of the twitter api for 3rd party apps we are only able to analyse selected popular user handles."
            type="warning"
          />
          <p className="flex items-center">
            <span className="w-7 h-7 text-center pt-0.5 text-white bg-black rounded-full">
              1
            </span>
            <span className="text-black text-base  tracking-tight mx-1">
              Enter the user handle
            </span>
          </p>
          <input
            value={temp}
            onChange={(e) => {
              setTemp(e.target.value);
              setHandle(e.target.value);
            }}
            className="w-full p-3 mt-3 focus:outline-black focus:outline-2 focus:-outline-offset-2 -outline-offset-1 rounded-lg outline outline-zinc-300 border-zinc-200"
            placeholder="e.g. JohnDoe"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSumbitHandle();
              }
            }}
          />
          <button
            disabled={isLoading}
            onClick={handleSumbitHandle}
            className={cn("w-full mt-2 bg-black text-white py-4 rounded-lg", {
              "bg-black/50": isLoading,
            })}
          >
            {!isLoading ? "Generate Analysis" : "Generating..."}
          </button>
        </section>
      )}
      {/* Hashtag */}
      {activeTab === "hashtag" && (
        <section className="my-5">
          <Note
            message="Due to unavaibility of the twitter api for 3rd party apps we are only able to analyse selected popular hashtags."
            type="warning"
          />
          <p className="flex items-center">
            <span className="w-7 h-7 text-center pt-0.5 text-white bg-black rounded-full">
              1
            </span>
            <span className="text-black text-base  tracking-tight mx-1">
              Enter the Hashtag
            </span>
          </p>
          <input
            value={temp}
            onChange={(e) => {
              setTemp(e.target.value);
              setHashtag(e.target.value);
            }}
            className="w-full p-3 mt-3 focus:outline-black focus:outline-2 focus:-outline-offset-2 -outline-offset-1 rounded-lg outline outline-zinc-300 border-zinc-200"
            placeholder="e.g. #CancelTwitter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSumbitHashtag();
              }
            }}
          />
          <button
            disabled={isLoading}
            onClick={handleSumbitHashtag}
            className={cn("w-full mt-2 bg-black text-white py-4 rounded-lg", {
              "bg-black/50": isLoading,
            })}
          >
            {!isLoading ? "Generate Analysis" : "Generating..."}
          </button>
        </section>
      )}
    </main>
  );
}
