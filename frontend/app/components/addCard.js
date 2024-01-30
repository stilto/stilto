"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Context from "../utils/context";
import SearchGifs from "./searchGifs";
import AddNft from "./addNft";

import Card1 from "../assets/cards/1.png";
import Card2 from "../assets/cards/2.png";
import Card3 from "../assets/cards/3.png";
import Card4 from "../assets/cards/4.png";
import Card5 from "../assets/cards/5.png";
import Card6 from "../assets/cards/6.png";
import Card7 from "../assets/cards/7.png";
import Card8 from "../assets/cards/8.png";
import Card9 from "../assets/cards/9.png";
import Card10 from "../assets/cards/10.png";
import Card11 from "../assets/cards/11.png";
import Card12 from "../assets/cards/12.png";
import Card13 from "../assets/cards/13.png";
import Card14 from "../assets/cards/14.png";
import Card15 from "../assets/cards/15.png";
import Card16 from "../assets/cards/16.png";
import Card17 from "../assets/cards/17.png";
import Card18 from "../assets/cards/18.png";
import Card19 from "../assets/cards/19.png";
import Card20 from "../assets/cards/20.png";
import Card21 from "../assets/cards/21.png";
import Card22 from "../assets/cards/22.png";
import Card23 from "../assets/cards/23.png";
import Card24 from "../assets/cards/24.png";
import Card25 from "../assets/cards/25.png";
import Card26 from "../assets/cards/26.png";
import Card27 from "../assets/cards/27.png";
import Card28 from "../assets/cards/28.png";
import Card29 from "../assets/cards/29.png";
import Card30 from "../assets/cards/30.png";
import Card31 from "../assets/cards/31.png";
import Card32 from "../assets/cards/32.png";
import Card33 from "../assets/cards/33.png";
import Card34 from "../assets/cards/34.png";
import Card35 from "../assets/cards/35.png";
import Card36 from "../assets/cards/36.png";
import Card37 from "../assets/cards/37.png";
import Card38 from "../assets/cards/38.png";
import Card39 from "../assets/cards/39.png";

const cards = [
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
  Card8,
  Card9,
  Card10,
  Card11,
  Card12,
  Card13,
  Card14,
  Card15,
  Card16,
  Card17,
  Card18,
  Card19,
  Card20,
  Card21,
  Card22,
  Card23,
  Card24,
  Card25,
  Card26,
  Card27,
  Card28,
  Card29,
  Card30,
  Card31,
  Card32,
  Card33,
  Card34,
  Card35,
  Card36,
  Card37,
  Card38,
  Card39,
];

export default function AddCardComp() {
  const { chosenCard, setChosenCard } = useContext(Context);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [currentAccount, setCurrentAccount] = useState("");
  const [signer, setSigner] = useState(null);

  const [cardTab, setCardTab] = useState(false);
  const [gifTab, setGifTab] = useState(true);
  const [nftTab, setNftTab] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [isConnected]);

  const checkIfWalletIsConnected = async () => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = await provider.getSigner();
      const account = accounts[0];
      setCurrentAccount(account);
      setSigner(signer);
      //   setIsConnected(true);
      //   setChainId((await provider.getNetwork()).chainId);
    } else {
      console.log("No authorized account found");
    }
  };

  const switchToGif = async () => {
    if (!gifTab) {
      setGifTab(true);
      setCardTab(false);
      setNftTab(false);
    }
  };

  const switchToCard = () => {
    if (!cardTab) {
      setCardTab(true);
      setGifTab(false);
      setNftTab(false);
    }
  };

  const switchToNft = () => {
    if (!cardTab) {
      setCardTab(false);
      setGifTab(false);
      setNftTab(true);
    }
  };

  const useCard = (e) => {
    setChosenCard(e);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40]">
      <section className="w-full h-20 lg:h-12 flex justify-center mt-2">
        <section className="w-full lg:w-1/2 h-20 lg:h-12 flex justify-evenly items-center text-xl text-center">
          <Link href="/add-card" className="text-[#1de9b6]">
            <span className="font-semibold">1.</span> Choose gift type
          </Link>
          <Link href="/add-message">
            <span className="font-semibold">2.</span> Add your message
          </Link>
          <Link href="/add-crypto">
            <span className="font-semibold">3.</span> Add crypto amount
          </Link>
        </section>
      </section>
      {!currentAccount && (
        <button
          onClick={() => open({ view: "Networks" })}
          className="w-60 h-14 bg-[#1de9b6] hover:bg-[#00bfa5] text-white text-lg mt-6 rounded-xl uppercase"
        >
          Connect Wallet
        </button>
      )}
      {currentAccount && (
        <section className="w-full flex flex-col items-center">
          <section className="w-3/4 sm:w-1/2 md:w-1/3 h-10 flex justify-center items-center bg-[#004d40] mt-6 rounded-full outline-none">
            <section
              className={`${
                cardTab
                  ? "bg-[#1de9b6] text-[#004d40] transition duration-300 ease-in-out"
                  : "text-white"
              } flex justify-center items-center w-1/2 h-full rounded-full outline-none cursor-pointer`}
              id="card"
              onClick={switchToCard}
            >
              CARD
            </section>
            <section
              className={`${
                gifTab
                  ? "bg-[#1de9b6] text-[#004d40] transition duration-150 ease-in-out"
                  : "text-white"
              } flex justify-center items-center w-1/2 h-full rounded-full outline-none cursor-pointer`}
              id="gif"
              onClick={switchToGif}
            >
              GIF
            </section>
            <section
              className={`${
                nftTab
                  ? "bg-[#1de9b6] text-[#004d40] transition duration-150 ease-in-out"
                  : "text-white"
              } flex justify-center items-center w-1/2 h-full rounded-full outline-none cursor-pointer`}
              id="gif"
              onClick={switchToNft}
            >
              NFT
            </section>
          </section>
          {cardTab && (
            <section className="w-full">
              <section className="flex justify-center mt-6">
                <section
                  className="py-4 px-8 bg-red-500 items-center text-[#e0f7fa] rounded-full flex"
                  role="alert"
                >
                  <span className="font-semibold text-left flex-auto">
                    Cards coming soon, use GIFs
                  </span>
                </section>
              </section>
              <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-10 justify-items-center my-14">
                {cards.map((i, key) => {
                  return (
                    <section
                      key={key}
                      className="w-4/6 flex flex-col items-center py-4 border-2 rounded-lg shadow-lg bg-white"
                    >
                      <Image src={i} alt="card" width={150} height={100} />
                      <Link
                        href="/add-message"
                        className="w-full flex justify-center mt-4"
                      >
                        <button
                          className="w-full lg:w-36 h-14 md:h-10 flex justify-center items-center bg-[#1de9b6] hover:bg-[#00bfa5] text-[#004d40] border border-[#1de9b6] hover:border-[#00bfa5] rounded-full"
                          onClick={() => setChosenCard(i)}
                        >
                          Use this card
                        </button>
                      </Link>
                    </section>
                  );
                })}
              </section>
            </section>
          )}
          {gifTab && (
            <section className="w-full flex justify-center lg:justify-end my-10">
              <SearchGifs />
            </section>
          )}
          {nftTab && (
            <section className="w-full flex justify-center lg:justify-end my-10">
              <AddNft />
            </section>
          )}
        </section>
      )}
    </section>
  );
}
