"use client";
import { useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";

import Context from "./utils/context";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "stilto - send a gift card with crypto",
// };

export default function RootLayout({ children }) {
  const [chosenGif, setChosenGif] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Context.Provider
          value={{
            chosenGif,
            setChosenGif,
            title,
            setTitle,
            message,
            setMessage,
          }}
        >
          {children}
        </Context.Provider>
      </body>
    </html>
  );
}
