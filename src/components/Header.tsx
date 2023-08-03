import React from "react";
import CommandCenter from "./ui/CommandCenter";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="px-5 fixed w-full max-w-4xl left-1/2 top-5 -translate-x-1/2">
      <nav className="flex justify-between mb-5 items-center">
        <span className="text-2xl tracking-wide">Senti𝕏.io</span>
        <CommandCenter />
      </nav>
      <hr />
    </header>
  );
}
