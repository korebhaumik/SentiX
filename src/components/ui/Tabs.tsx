"use client";

import cn from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAi } from "@/context/Ai.context";

let tabs: Tab = [
  { id: "tweet", label: "Tweets" },
  { id: "handle", label: "Handle" },
  { id: "hashtag", label: "Hashtag" },
];

type ConfigType = "tweet" | "handle" | "hashtag";
type Tab = {
  id: ConfigType;
  label: string;
}[];
type Props = {
  activeTab: ConfigType;
  setActiveTab: (id: ConfigType) => void;
};
export default function AnimatedTabs({ activeTab, setActiveTab }: Props) {
  const { setMessages, setConfig } = useAi();
  return (
    <div className="flex space-x-1 w-fit mx-auto border px-2 py-2 mt-3 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            console.log("active tab", tab.id);
            setConfig(tab.id);
            setMessages([]);
            setActiveTab(tab.id);
          }}
          className={cn(
            "relative px-3 py-1.5 text-sm font-medium text-black transition focus-visible:outline-2",
            {
              "hover:text-black/60": activeTab !== tab.id,
              //   "text-white": activeTab === tab.id,
            }
          )}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="underline"
              className="absolute inset-0 z-10 bg-black/10  border-black"
              style={{ borderRadius: 6 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <p className="flex items-center">
            {tab.id === "tweet" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 14 12"
                fill="none"
              >
                <path
                  d="M13.0706 2.16384C12.6743 2.33438 12.2577 2.45314 11.8311 2.51718C12.0305 2.48298 12.324 2.12395 12.4408 1.97863C12.6183 1.75942 12.7536 1.50918 12.8398 1.24061C12.8398 1.22067 12.8597 1.19217 12.8398 1.17792C12.8297 1.17244 12.8185 1.16956 12.807 1.16956C12.7956 1.16956 12.7843 1.17244 12.7742 1.17792C12.311 1.4288 11.8179 1.62027 11.3068 1.74782C11.2889 1.75326 11.27 1.75375 11.2519 1.74923C11.2338 1.74471 11.2173 1.73536 11.2042 1.72217C11.1644 1.67479 11.1216 1.63006 11.076 1.58825C10.8675 1.40145 10.6309 1.24856 10.375 1.13518C10.0295 0.993443 9.65632 0.932059 9.28364 0.955665C8.92202 0.978503 8.56896 1.0755 8.24643 1.24061C7.92882 1.41469 7.64968 1.65119 7.42578 1.93588C7.19027 2.22891 7.02024 2.56897 6.92712 2.9332C6.85034 3.27965 6.84163 3.63773 6.90148 3.9875C6.90148 4.04734 6.90148 4.05589 6.85019 4.04734C4.81851 3.74815 3.15157 3.02723 1.78953 1.47997C1.72969 1.41158 1.69834 1.41158 1.6499 1.47997C1.05721 2.3804 1.34501 3.80514 2.08587 4.50896C2.1856 4.60299 2.28818 4.69417 2.39646 4.77966C2.05678 4.75554 1.7254 4.66349 1.42194 4.50896C1.36496 4.47191 1.33361 4.49186 1.33076 4.56025C1.32268 4.65506 1.32268 4.75038 1.33076 4.84519C1.39022 5.29957 1.56928 5.73 1.84965 6.09247C2.13002 6.45495 2.50162 6.73646 2.92647 6.90821C3.03003 6.95257 3.13795 6.986 3.24846 7.00794C2.93399 7.06985 2.61148 7.07948 2.29388 7.03644C2.2255 7.02219 2.19985 7.05923 2.2255 7.12477C2.64437 8.26456 3.55335 8.61219 4.22013 8.80596C4.31131 8.82021 4.40249 8.82021 4.50507 8.843C4.50507 8.843 4.50507 8.843 4.48798 8.8601C4.29136 9.21913 3.49636 9.46134 3.13163 9.58671C2.4659 9.82584 1.75611 9.91724 1.05151 9.85456C0.940384 9.83747 0.914739 9.84032 0.886244 9.85456C0.857749 9.86881 0.886244 9.90016 0.917588 9.92865C1.06006 10.0227 1.20254 10.1053 1.35071 10.1851C1.79182 10.4257 2.25816 10.6168 2.74125 10.755C5.24308 11.4446 8.05836 10.9374 9.93616 9.07096C11.4122 7.60633 11.9308 5.58606 11.9308 3.56293C11.9308 3.486 12.0248 3.4404 12.079 3.40051C12.4524 3.10955 12.7816 2.76593 13.0563 2.3804C13.1039 2.32293 13.1283 2.24976 13.1247 2.17524C13.1247 2.1325 13.1247 2.14105 13.0706 2.16384Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {tab.id === "handle" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M11 8C11 8.79565 10.6839 9.55871 10.1213 10.1213C9.55871 10.6839 8.79565 11 8 11C7.20435 11 6.44129 10.6839 5.87868 10.1213C5.31607 9.55871 5 8.79565 5 8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8ZM11 8C11 9.10467 11.6713 10 12.5 10C13.3287 10 14 9.10467 14 8C14 6.61187 13.5187 5.26669 12.638 4.19365C11.7574 3.12062 10.532 2.38613 9.1705 2.11533C7.80903 1.84453 6.3958 2.05418 5.17158 2.70855C3.94736 3.36292 2.98791 4.42152 2.45671 5.70399C1.9255 6.98646 1.85541 8.41345 2.25837 9.7418C2.66133 11.0702 3.51242 12.2177 4.66661 12.9889C5.82081 13.7601 7.2067 14.1072 8.58814 13.9712C9.96959 13.8351 11.2611 13.2242 12.2427 12.2427M11 8V5.5"
                  stroke="black"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {tab.id === "hashtag" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3.0625 4.8125H11.8125M2.1875 9.1875H10.9375M9.8875 1.3125L7.6125 12.6875M6.3875 1.3125L4.1125 12.6875"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <span className="ml-1">{tab.label}</span>
          </p>
        </button>
      ))}
    </div>
  );
}
