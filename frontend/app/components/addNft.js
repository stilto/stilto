"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { ethers } from "ethers";
import peanut from "@squirrel-labs/peanut-sdk";
import axios from "axios";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

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

export default function AddNft() {
  const { chosenGif, chosenCard, title, message } = useContext(Context);
  const { address, isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const connectedChainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  const [signer, setSigner] = useState(null);
  const { name: connectedChainName } = chains.find(
    ({ id }) => id === connectedChainId
  ) || { name: "Unknown Network" };
  const [chosenChain, setChosenChain] = useState({
    id: connectedChainId,
    chain: connectedChainName,
  });
  const [giftId, setGiftId] = useState("");
  const [giftLinkReady, setGiftLinkReady] = useState(false);
  const [walletNfts, setWalletNfts] = useState([]);
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
      async function getWalletNfts() {
        await axios
          .get("https://api.stilto.io/getwalletnfts", {
            params: { address, chain: connectedChainId },
          })
          .then((response) => {
            setWalletNfts(response.data.result);
          });
      }

      getWalletNfts();
      provider();
      setIsLoggedIn(true);
    }
  }, [isConnected, connectedChainId, address]);

  const createLink = async (tokenAddress, tokenId, nftImage) => {
    setLoadingLink(true);
    if (!isConnected) throw new Error("Connect wallet first");

    window.signer = signer;
    const createLinkResponse = await peanut.createLink({
      structSigner: {
        signer,
      },
      linkDetails: {
        chainId: connectedChainId,
        tokenAddress,
        tokenAmount: 1,
        tokenType: 2,
        tokenId,
      },
    });

    createClaimUrl(createLinkResponse.link[0], connectedChainName, nftImage);
  };

  const createClaimUrl = async (link, chain, nftImage) => {
    await axios
      .post("https://api.stilto.io/createclaimurl", {
        sender: address,
        gif: chosenGif,
        card: chosenCard,
        nftImage,
        title,
        message,
        amount: "",
        chain,
        chainId: chosenChain.id.toString(),
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
    <section className="w-full flex flex-col justify-center text-[#004d40]">
      <section className="flex flex-col justify-center items-center my-4">
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
                  <section className="w-8 h-8 flex justify-center">
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
        <section className="md:w-2/3 lg:w-2/4 xl:w-1/3 flex flex-col md:flex-row justify-between md:justify-between items-center mt-8 mb-4 md:px-10">
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
                      setChosenChain({ id: item.key, chain: item.label })
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
      </section>
      {walletNfts != [] && (
        <section className="w-full flex flex-wrap flex-col md:flex-row justify-center items-center mt-8">
          {walletNfts.map((nft, i) => (
            <Card
              className="md:w-1/5 h-[30rem] flex flex-col justify-between items-center mb-10 md:mr-2"
              key={i}
            >
              {nft.media?.media_collection ? (
                <Image
                  alt="NFT image"
                  className="h-64 mt-4 overflow-hidden rounded-xl"
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
              <button
                className="w-36 h-10 bg-[#1de9b6] hover:bg-[#00bfa5] text-[#004d40] mb-2 border border-[#1de9b6] hover:border-[#00bfa5] rounded-full"
                onClick={() =>
                  createLink(
                    nft.token_address,
                    nft.token_id,
                    nft.media ? nft.media?.media_collection?.medium.url : ""
                  )
                }
              >
                Send NFT
              </button>
            </Card>
          ))}
        </section>
      )}
    </section>
  );
}
