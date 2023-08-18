"use client";
import Link from "next/link";

import { Parisienne } from "next/font/google";

const parisienne = Parisienne({ weight: "400", subsets: ["latin"] });

export default function Header() {
  return (
    <section className="w-screen h-20 flex justify-between items-center px-10 bg-white text-gray-900 text-xl border-b border-gray-300 tracking-wider sticky top-0">
      <section className="w-1/2 h-10 flex items-center">
        <h1
          className={`${parisienne.className} h-14 flex items-center text-5xl font-semibold mr-2 px-2`}
        >
          <Link href="/">stilto</Link>
        </h1>
      </section>
      <section className="w-1/6 flex justify-evenly">
        <Link href="/how-it-works">How it works</Link>
        <Link href="/faq">FAQ</Link>
      </section>
    </section>
  );
}
