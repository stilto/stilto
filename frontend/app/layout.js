"use client";
import { useState } from "react";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";

import Context from "./utils/context";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

// export const metadata = {
//   title: "stilto - send a gift card with crypto",
// };

export default function RootLayout({ children }) {
  const [chosenGif, setChosenGif] = useState("");
  const [chosenCard, setChosenCard] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Context.Provider
          value={{
            chosenGif,
            setChosenGif,
            chosenCard,
            setChosenCard,
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
