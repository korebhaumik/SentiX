"use client";
import React, { useState } from "react";
import AnimatedTabs from "./ui/Tabs";
import Input from "./ui/Input";

type Props = {};

export default function QueryBar({}: Props) {
  let [activeTab, setActiveTab] = useState<string>("tweet");
  return (
    <main className="px-5 max-w-2xl mx-auto">
      <AnimatedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Input activeTab={activeTab} />
    </main>
  );
}
