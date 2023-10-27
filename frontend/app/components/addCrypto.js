"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";
import axios from "axios";

import Context from "../utils/context";
import ConnectWallet from "./connectWallet";
// import createGift from "../createGift";

export default function AddCryptoComp() {
  const { chosenGif, chosenCard, title, message } = useContext(Context);
  const [currentAccount, setCurrentAccount] = useState("");
  const [signer, setSigner] = useState(null);
  //   const [chainId, setChainId] = useState(null);
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");
  const [linkStatus, setLinkStatus] = useState(null);
  //   const [isConnected, setIsConnected] = useState(false);
  const [claimTx, setClaimTx] = useState(null);
  //   const [warningMessage, setWarningMessage] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

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

  const createLink = async () => {
    if (!signer) throw new Error("Connect wallet first");
    const network = await signer.provider.getNetwork();
    const chainId = network.chainId;

    window.signer = signer;

    const { link, txReceipt } = await peanut.createLink({
      signer: signer,
      chainId: chainId,
      tokenAmount: amount,
      tokenType: 0, // 0 for ether, 1 for erc20, 2 for erc721, 3 for erc1155
      verbose: true,
    });
    setLink(link);
    createClaimUrl(link);
  };

  const claimLink = async () => {
    if (!signer || !link) return;
    const claimTx = await peanut.claimLink({ signer: signer, link: link });
    setClaimTx(claimTx);
  };

  const checkLinkStatus = async () => {
    if (!signer || !link) throw new Error("signer or link is not set");
    try {
      // setLinkStatus({ claimed: true, deposit: null})
      const { claimed, deposit } = await peanut.getLinkStatus({
        signer: signer,
        link: link,
      });
      setLinkStatus(claimed);
    } catch (error) {
      console.error("Failed to check link status", error);
    }
  };

  const createClaimUrl = async (link) => {
    await axios.post("http://localhost:5001/createclaimurl", {
      sender: currentAccount,
      gif: chosenGif,
      card: chosenCard,
      title,
      message,
      claimLink: link,
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40]">
      <section className="w-full h-20 lg:h-12 flex justify-center mt-2">
        <section className="w-full lg:w-1/2 h-20 lg:h-12 flex justify-evenly items-center text-xl text-center">
          <Link href="/add-card">
            <span className="font-semibold">1.</span> Choose card/gif
          </Link>
          <Link href="/add-message">
            <span className="font-semibold">2.</span> Add your message
          </Link>
          <Link href="/add-crypto" className="text-[#1de9b6]">
            <span className="font-semibold">3.</span> Add crypto amount
          </Link>
        </section>
      </section>
      {!currentAccount && <ConnectWallet />}
      {currentAccount && (
        <section className="w-full h-screen flex flex-col lg:flex-row lg:justify-evenly items-center lg:items-start bg-[#e0f7fa] text-[#004d40] mt-6">
          <section className="w-full lg:w-2/5 h-3/4 flex flex-col p-2 rounded-lg shadow-lg bg-white">
            <section className="flex justify-between md:justify-evenly items-center mt-10 mb-4">
              <label htmlFor="amount" className="text-lg">
                ETH amount to gift:
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
            {!link ? (
              <section className="text-center">
                Add amount and click &apos;Create link&apos; to get your
                claimable link.
              </section>
            ) : (
              <section className="text-center break-all">
                Share this claimable link:{" "}
                {`https://www.stilto.com/card/claim?from=${currentAccount}&title=${title.replaceAll(
                  " ",
                  "-"
                )}&message=${message.replaceAll(" ", "-")}`}
              </section>
            )}
          </section>
          <section className="w-full lg:w-2/5 h-3/4 flex flex-col items-center mt-10 lg:mt-0 p-2 rounded-lg shadow-lg bg-white">
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
          </section>
        </section>
      )}
    </section>
  );
}
