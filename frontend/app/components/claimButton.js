"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";
import axios from "axios";

export default function ClaimButton() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [urlFrom, setUrlFrom] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [urlMessage, setUrlMessage] = useState("");
  const [signer, setSigner] = useState(null);
  const [link, setLink] = useState("");
  const [claimTx, setClaimTx] = useState(null);
  const [claimButtonLink, setClaimButtonLink] = useState("");

  const [giftSender, setGiftSender] = useState("");
  const [giftCardOrGif, setGiftCardOrGif] = useState("");
  const [giftTitle, setGiftTitle] = useState("");
  const [giftMessage, setGiftMessage] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setUrlFrom(urlParams.get("from"));
    setUrlTitle(urlParams.get("title"));
    setUrlMessage(urlParams.get("message"));
    console.log("from 1", urlFrom);
    console.log("title 1", urlParams.get("title").replaceAll("-", " "));
    console.log("message 1", urlMessage.replaceAll("-", " "));
    async function getClaimUrl() {
      await axios
        .get("http://localhost:5001/getclaimurl", {
          params: {
            sender: urlParams.get("from"),
            title: urlParams.get("title").replaceAll("-", " "),
            message: urlParams.get("message").replaceAll("-", " "),
          },
        })
        .then((response) => {
          setLink(response.data[0].claimLink);
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
    const claimTx = await peanut.claimLink({ signer: signer, link: link });
    setClaimTx(claimTx);
  };

  return (
    <section className="">
      <button
        onClick={claimLink}
        className="bg-red-300 w-24 h-8 flex justify-center items-center"
      >
        CLAIM
      </button>
    </section>
  );
}
