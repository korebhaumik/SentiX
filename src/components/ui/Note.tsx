import cn from "@/lib/utils";
import React from "react";

type Props = {
  message: string;
  type: "info" | "warning" | "error";
};

export default function Note({ message, type }: Props) {
  return (
    <div className="relative my-2 mb-3">
      <hr className={cn("border-none h-full absolute w-1 bg-black rounded-full", {
        "bg-zinc-500": type === "info",
        "bg-yellow-500": type === "warning",
        "bg-red-500": type === "error",
      })} />
      <p className="ml-3 ">{message}</p>
    </div>
  );
}
