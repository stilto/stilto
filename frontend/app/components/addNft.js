"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";
import axios from "axios";
import { useAccount } from "wagmi";

import Context from "../utils/context";

export default function AddNft() {
  const { chosenGif, chosenCard, title, message } = useContext(Context);
  const { address, isConnected } = useAccount();
  const [currentAccount, setCurrentAccount] = useState("");
  const [signer, setSigner] = useState(null);

  const [walletNfts, setWalletNfts] = useState([]);
  const [loadingLink, setLoadingLink] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();

    async function getWalletNfts() {
      await axios
        .get("https://api.stilto.io/getwalletnfts", {
          params: { address },
        })
        .then((response) => {
          console.log("nfts here", response.data.result);
          setWalletNfts(response.data.result);
        });
    }

    if (isConnected) {
      getWalletNfts();
    }
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
    } else {
      console.log("No authorized account found");
    }
  };

  const createLink = async (tokenAddress, tokenId) => {
    setLoadingLink(true);
    if (!signer) throw new Error("Connect wallet first");
    const network = await signer.provider.getNetwork();
    const chainId = network.chainId;

    window.signer = signer;
    const createLinkResponse = await peanut.createLink({
      structSigner: {
        signer,
      },
      linkDetails: {
        chainId,
        tokenAddress,
        tokenAmount: 1,
        tokenType: 2,
        tokenId,
      },
    });
    console.log("tokenADD", tokenAddress);
    console.log("tokenIDDD", tokenId);
    console.log("createLinkResponse here!!!", createLinkResponse);
    setLoadingLink(false);
  };

  return (
    <section className="w-full flex justify-center text-[#004d40]">
      {walletNfts != [] && (
        <section className="w-full flex flex-wrap flex-col md:flex-row justify-center items-center mt-8">
          {walletNfts.map((nft, i) => (
            <Card
              className="md:w-1/5 h-[26rem] flex flex-col justify-between items-center mb-10 md:mr-2 cursor-pointer"
              key={i}
              onClick={() => createLink(nft.token_address, nft.token_id)}
            >
              {nft.media?.media_collection ? (
                <Image
                  alt="NFT image"
                  className="h-64 overflow-hidden rounded-xl"
                  src={`${
                    nft.media && nft.media?.media_collection?.medium.url
                  }`}
                  width={270}
                  height={270}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm0 0V5zm2-2h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17"
                  />
                </svg>
              )}
              <CardFooter className="flex-col items-center">
                <p className="text-center uppercase font-bold">{nft.name}</p>
                <p className="uppercase font-bold">{`${nft.token_address.slice(
                  0,
                  4
                )}...${nft.token_address.slice(38)}`}</p>
                <p className="uppercase font-bold">{nft.token_id}</p>
              </CardFooter>
              <Link href="/add-message" className="mb-4">
                <button
                  className="w-36 h-10 bg-[#1de9b6] hover:bg-[#00bfa5] text-[#004d40] border border-[#1de9b6] hover:border-[#00bfa5] rounded-full"
                  onClick={() => createLink(nft.token_address, nft.token_id)}
                >
                  Send NFT
                </button>
              </Link>
            </Card>
          ))}
        </section>
      )}
    </section>
  );
}
