"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";
import axios from "axios";

export default function ClaimButton() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [link, setLink] = useState("");
  const [claimTx, setClaimTx] = useState(null);
  const [claimButtonLink, setClaimButtonLink] = useState("");

  const [giftSender, setGiftSender] = useState("");
  const [giftCardOrGif, setGiftCardOrGif] = useState("");
  const [giftTitle, setGiftTitle] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftAmount, setGiftAmount] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    async function getClaimUrl() {
      await axios
        .get("https://api.stilto.io/getclaimurl", {
          params: {
            id: urlParams.get("id"),
          },
        })
        .then((response) => {
          setLink(response.data[0].claimLink);
          setGiftSender(response.data[0].sender);
          setGiftCardOrGif(response.data[0].gif);
          setGiftTitle(response.data[0].title);
          setGiftMessage(response.data[0].message);
          setGiftAmount(response.data[0].amount);
        });
    }

    getClaimUrl();
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

  const claimLink = async () => {
    if (!signer || !link) return;
    const claimTx = await peanut.claimLink({
      structSigner: {
        signer,
      },
      link: link,
    });
    setClaimTx(claimTx);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40] py-10">
      <section className="w-full lg:w-2/3 flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-6 md:p-12 mb-6">
        <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:pr-4 text-center lg:text-left break-all">
          <h2 className="text-2xl font-semibold mb-4">{giftSender}</h2>
          {giftTitle && (
            <h1 className="text-xl font-semibold mb-2">{giftTitle}</h1>
          )}
          {giftMessage && <p className="mb-4">{giftMessage}</p>}
          {giftAmount && <p className="mb-4">{giftAmount}</p>}
          <button
            onClick={claimLink}
            className="w-44 h-12 bg-[#1de9b6] hover:bg-[#00bfa5] text-lg rounded-xl flex justify-center items-center"
          >
            CLAIM
          </button>
        </section>
        <section className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
          {giftCardOrGif && (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full rounded-lg shadow-lg"
            >
              <source src={giftCardOrGif} type="video/mp4" />
            </video>
          )}
        </section>
      </section>
    </section>
  );
}
