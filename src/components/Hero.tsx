import React from "react";
import Link from "next/link";

type Props = {};

export default function Hero({}: Props) {
  return (
    <main className=" max-w-4xl mx-auto pt-32 sm:pt-32">
      <Link
        href="https://github.com/korebhaumik/SentiX"
        target="_blank"
        className="flex items-center w-48 justify-between py-3 mx-auto shadow-md px-5 border-2 border-zinc-200 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 17 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.24242 0C3.68848 0 0 3.67055 0 8.20235C0 11.8319 2.35939 14.8975 5.63576 15.9843C6.04788 16.0561 6.20242 15.81 6.20242 15.5947C6.20242 15.3999 6.19212 14.754 6.19212 14.067C4.12121 14.4464 3.58545 13.5646 3.42061 13.1033C3.32788 12.8674 2.92606 12.1395 2.57576 11.9447C2.28727 11.7909 1.87515 11.4115 2.56545 11.4013C3.21455 11.391 3.67818 11.9959 3.83273 12.242C4.57455 13.4826 5.75939 13.134 6.23333 12.9187C6.30545 12.3856 6.52182 12.0267 6.75879 11.8216C4.92485 11.6166 3.00848 10.9091 3.00848 7.77173C3.00848 6.87972 3.32788 6.14151 3.85333 5.56735C3.77091 5.36229 3.48242 4.52155 3.93576 3.39372C3.93576 3.39372 4.62606 3.17841 6.20242 4.23446C6.86182 4.04991 7.56243 3.95763 8.26303 3.95763C8.96364 3.95763 9.66424 4.04991 10.3236 4.23446C11.9 3.16816 12.5903 3.39372 12.5903 3.39372C13.0436 4.52155 12.7552 5.36229 12.6727 5.56735C13.1982 6.14151 13.5176 6.86947 13.5176 7.77173C13.5176 10.9194 11.5909 11.6166 9.75697 11.8216C10.0558 12.078 10.3133 12.5701 10.3133 13.3391C10.3133 14.4361 10.303 15.3179 10.303 15.5947C10.303 15.81 10.4576 16.0664 10.8697 15.9843C14.1255 14.8975 16.4848 11.8216 16.4848 8.20235C16.4848 3.67055 12.7964 0 8.24242 0Z"
            fill="#1B1F23"
          />
        </svg>
        <span>Star on GitHub</span>
      </Link>

      <h1 className="text-3xl md:text-5xl font-semibold md:leading-[56px] tracking-wide text-center max-w-3xl mx-auto mt-3">
        Generate Sentimental Analysis for anything Twitter in seconds...
      </h1>
      <h2 className="text-zinc-600 mx-auto w-fit text-sm font-medium mt-3">
        500 tweets analysed so far
      </h2>
    </main>
  );
}
