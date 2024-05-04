"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { ethers } from "ethers";
import peanut from "@squirrel-labs/peanut-sdk";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import Context from "../utils/context";
// import createGift from "../createGift";

export default function AddCryptoComp() {
  const { chosenGif, chosenCard, title, message } = useContext(Context);

  const { address, isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  const connectedChainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  const [signer, setSigner] = useState(null);
  const { name: connectedChainName } = chains.find(
    ({ id }) => id === connectedChainId
  ) || { name: "Unknown Network" };
  const {
    nativeCurrency: { symbol: connectedChainSymbol },
  } = chains.find(({ id }) => id === connectedChainId) || {
    symbol: "Unknown Symbol",
  };
  const [chosenChain, setChosenChain] = useState({
    id: connectedChainId,
    chain: connectedChainName,
  });

  const [amount, setAmount] = useState("");

  const [giftId, setGiftId] = useState("");
  const [giftLinkReady, setGiftLinkReady] = useState(false);
  const [loadingLink, setLoadingLink] = useState(false);

  const items = [
    { key: 42161, label: "Arbitrum" },
    { key: 43114, label: "Avalanche" },
    { key: 8453, label: "Base" },
    { key: 56, label: "BNB Smart Chain" },
    { key: 1, label: "Ethereum" },
    // { key: 59144, label: "Linea" },
    // { key: 5000, label: "Mantle" },
    { key: 10, label: "OP Mainnet" },
    { key: 137, label: "Polygon" },
    // { key: 80001, label: "Polygon Mumbai" },
    // { key: 1101, label: "Polygon zkEVM" },
    { key: 11155111, label: "Sepolia" },
  ];

  useEffect(() => {
    const provider = () => {
      const accounts = window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length !== 0) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        const signer = provider.getSigner();
        setSigner(signer);
      }
    };

    if (!isConnected) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    provider();
  }, [isConnected]);

  const createLink = async () => {
    setLoadingLink(true);
    if (!isConnected) throw new Error("Connect wallet first");

    window.signer = signer;
    const createLinkResponse = await peanut.createLink({
      structSigner: { signer },
      linkDetails: {
        chainId: connectedChainId,
        tokenAmount: amount,
        tokenType: 0,
      },
    });
    createClaimUrl(createLinkResponse.link[0], connectedChainName);
  };

  const createClaimUrl = async (link, chain) => {
    await axios
      .post("https://api.stilto.io/createclaimurl", {
        sender: address,
        gif: chosenGif,
        card: chosenCard,
        title,
        message,
        amount,
        chain,
        chainId: chosenChain.id.toString(),
        //chainSymbol: connectedChainSymbol,
        claimLink: link,
      })
      .then((response) => {
        setGiftId(response.data);
        setGiftLinkReady(true);
        setLoadingLink(false);
      });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://stilto.io/card/claim?id=${giftId}`);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40]">
      <section className="w-full h-20 lg:h-12 flex justify-center mt-2">
        <section className="w-full lg:w-1/2 h-20 lg:h-12 flex justify-evenly items-center text-xl text-center">
          <Link href="/add-card">
            <span className="font-semibold">1.</span> Choose gift type
          </Link>
          <Link href="/add-message">
            <span className="font-semibold">2.</span> Add your message
          </Link>
          <Link href="/add-crypto" className="text-[#1de9b6]">
            <span className="font-semibold">3.</span> Add crypto amount
          </Link>
        </section>
      </section>
      {!isLoggedIn && (
        <section className="mt-8">
          <ConnectButton />
        </section>
      )}
      {isLoggedIn && (
        <section className="w-full h-screen flex flex-col lg:flex-row lg:justify-evenly items-center lg:items-start bg-[#e0f7fa] text-[#004d40] mt-6">
          <section className="w-full lg:w-2/5 h-96 lg:h-3/4 flex flex-col p-2 rounded-lg shadow-lg bg-white">
            <section className="text-center text-lg mt-6">
              Add amount and click &apos;Create link&apos; to get your claimable
              link.
            </section>
            <section className="flex justify-between md:justify-between items-center mt-8 mb-4 md:px-10">
              <span className="text-lg">Choose Network:</span>
              <section className="flex items-center">
                <Dropdown>
                  <DropdownTrigger>
                    <button className="w-56 h-10 flex justify-center items-center bg-[#1de9b6] hover:bg-[#00bfa5] text-lg text-[#004d40] rounded-lg outline-none">
                      {chosenChain.chain}
                      <svg
                        className="h-6 w-6 text-[#004d40] cursor-pointer"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    className="h-80 bg-[#1de9b6] text-[#004d40] rounded-lg overflow-scroll"
                    items={items}
                  >
                    {(item) => (
                      <DropdownItem
                        key={item.key}
                        onClick={() =>
                          setChosenChain({
                            id: item.key,
                            chain: item.label,
                          })
                        }
                        className="hover:bg-[#00bfa5]"
                      >
                        {item.label}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </section>
            </section>
            {chosenChain.id !== connectedChainId && (
              <section className="flex justify-center items-center mt-4 md:px-10">
                <Button
                  className=" bg-red-500 py-4 px-8 text-[#e0f7fa] font-semibold rounded-full"
                  onClick={() => switchChain({ chainId: chosenChain.id })}
                >
                  Wrong network. Change to: {chosenChain.chain}
                </Button>
              </section>
            )}
            <section className="flex justify-between md:justify-between items-center mt-8 mb-4 md:px-10">
              <label htmlFor="amount" className="text-lg">
                {connectedChainSymbol} amount to gift:
              </label>
              <section className="flex items-center">
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="amount"
                  className="w-24 h-10 bg-white text-[#004d40] text-right placeholder:text-[#004d40] placeholder:text-sm placeholder:text-left placeholder:pl-2 outline-none border-2 border-[#004d40] rounded-l-lg"
                />
                <button
                  onClick={createLink}
                  className="w-36 h-10 bg-[#1de9b6] hover:bg-[#00bfa5] text-lg text-[#004d40] ml-4 rounded-r-lg"
                >
                  Create link
                </button>
              </section>
            </section>
            {!giftLinkReady ? (
              loadingLink && (
                <section className="flex justify-center mt-8">
                  <CircularProgress size="lg" color="success" />
                </section>
              )
            ) : (
              <section className="text-center break-all mt-4 mx-4">
                <section className="flex flex-row justify-center">
                  Share this claimable link:{" "}
                  <Popover placement="right" size="sm" className="rounded-lg">
                    <PopoverTrigger>
                      <section className="w-8 h-8 flex justify-center bg-white">
                        <svg
                          className="h-6 w-6 text-[#004d40] cursor-pointer"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          onClick={copyLink}
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                        </svg>{" "}
                      </section>
                    </PopoverTrigger>
                    <PopoverContent>
                      <section className="px-1 py-2">
                        <section className="text-[#004d40] text-small font-bold">
                          Copied!
                        </section>
                      </section>
                    </PopoverContent>
                  </Popover>
                </section>
                {`https://stilto.io/card/claim?id=${giftId}`}
              </section>
            )}
          </section>
          <section className="w-full lg:w-2/5 h-3/4 flex flex-col justify-center items-center mt-10 lg:mt-0 p-2 rounded-lg shadow-lg bg-white">
            {chosenGif !== "" ? (
              <video autoPlay muted loop className="w-96 h-96 rounded-lg">
                <source src={chosenGif} type="video/mp4" />
              </video>
            ) : (
              chosenCard && (
                <section className="flex flex-col items-center border-2 rounded-lg">
                  <Image
                    src={chosenCard}
                    alt="card"
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                </section>
              )
            )}
            {title && (
              <h1 className="text-xl text-center font-semibold mt-4">
                {title}
              </h1>
            )}
            {message && <p className="w-full text-center mt-2">{message}</p>}
            <p className="w-full text-center mt-2">
              Gift amount: {amount} {connectedChainSymbol}
            </p>
          </section>
        </section>
      )}
    </section>
  );
}
