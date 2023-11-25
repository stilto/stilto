"use client";
import { useState } from "react";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { createConfig, WagmiConfig, mainnet, sepolia } from "wagmi";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { Poppins } from "next/font/google";

import Context from "./utils/context";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const projectId = process.env.NEXT_PUBLIC_WEB3MODAL_PROJECT_ID;

const metadata = {
  name: "stilto",
  description: "send a gift card with crypto",
  url: "https://stilto.io",
};

const chains = [mainnet, sepolia];
const wagmiConfig = createConfig({ chains, projectId, metadata });

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains,
  projectId,
});

export default function RootLayout({ children }) {
  const [chosenGif, setChosenGif] = useState("");
  const [chosenCard, setChosenCard] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextUIProvider>
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
            <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
          </Context.Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
