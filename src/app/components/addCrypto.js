"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";

import Context from "../utils/context";
import ConnectWallet from "./connectWallet";

export default function AddCryptoComp() {
  const { chosenGif, title, message } = useContext(Context);
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

  return (
    <section className="min-h-screen flex flex-col items-center bg-white text-black">
      <section className="w-full h-20 lg:h-12 flex justify-center mt-2">
        <section className="w-full lg:w-1/2 h-20 lg:h-12 flex justify-evenly items-center text-xl text-center">
          <Link href="/add-card">
            <span className="font-semibold">1.</span> Chose card/gif
          </Link>
          <Link href="/add-message">
            <span className="font-semibold">2.</span> Add your message
          </Link>
          <Link href="/add-crypto" className="text-[#4392cf]">
            <span className="font-semibold">3.</span> Add crypto amount
          </Link>
        </section>
      </section>
      {!currentAccount && <ConnectWallet />}
      {currentAccount && (
        <section className="w-full min-h-screen flex flex-col lg:flex-row lg:justify-center items-center lg:items-start bg-white text-black">
          <section className="w-full h-full flex mt-10 p-2 rounded">
            <section className="w-1/2">
              <section className="h-14 flex justify-center items-center">
                <section>
                  <label htmlFor="amount" className="mr-2 text-lg">
                    Amount:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in ETH"
                    className="w-40 h-10 bg-gray-200 text-slate-900 text-right placeholder:text-slate-900 placeholder:text-sm placeholder:text-left placeholder:pl-2 outline-none"
                  />
                  <button
                    onClick={createLink}
                    className="w-36 h-10 bg-[#4392cf] hover:bg-[#4499da] text-slate-100 text-base font-semibold outline-none border-none rounded-r-lg cursor-pointer uppercase"
                  >
                    Create link
                  </button>
                </section>
              </section>
              <section className="flex justify-center">
                <section className="p-4">
                  <section>
                    <section>
                      {link && (
                        <section className="h-20 flex flex-col items-center">
                          <h2 className="border-b-2 mb-2">
                            SHARE THIS CLAIM LINK
                          </h2>
                          <p>{link}</p>
                        </section>
                      )}
                    </section>
                    <section className="flex flex-col items-center mt-6">
                      <p className="border-b-2 mb-2">CHECK CLAIM STATUS</p>
                      <button
                        onClick={checkLinkStatus}
                        //   className="h-10 bg-slate-100 hover:bg-black text-black hover:text-slate-100 font-semibold mb-2 px-6 border-2 border-black uppercase"
                        className="w-52 h-12 bg-[#4392cf] hover:bg-[#4499da] text-slate-100 text-base font-semibold outline-none border-none rounded-lg cursor-pointer uppercase"
                      >
                        Check Claim Status
                      </button>
                      {linkStatus !== null && (
                        <section>
                          <p className="text-lg">
                            Link is claimed: {linkStatus.toString()}
                          </p>
                        </section>
                      )}
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className="w-1/2 flex flex-col items-center">
              <section className="w-full flex flex-col items-center rounded-lg">
                {chosenGif && (
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-48 lg:w-60 h-48 lg:h-60 mt-10 rounded-lg"
                  >
                    <source src={chosenGif} type="video/mp4" />
                  </video>
                )}
                {title && (
                  <h1 className="text-xl text-center font-semibold mt-4">
                    {title}
                  </h1>
                )}
                {message && (
                  <p className="w-full text-center mt-2">{message}</p>
                )}
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}
