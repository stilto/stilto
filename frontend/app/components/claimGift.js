"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { ethers } from "ethers";
import peanut from "@squirrel-labs/peanut-sdk";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

export default function ClaimButton() {
  const { isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  const connectedChainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [signer, setSigner] = useState(null);
  const [link, setLink] = useState("");
  const [linkStatus, setLinkStatus] = useState(false);
  const [loadingLink, setLoadingLink] = useState(false);

  const [giftSender, setGiftSender] = useState("");
  const [giftCardOrGif, setGiftCardOrGif] = useState("");
  const [giftNftImage, setGiftNftImage] = useState("");
  const [giftTitle, setGiftTitle] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftAmount, setGiftAmount] = useState("");
  const [giftChain, setGiftChain] = useState("");
  const [giftChainId, setGiftChainId] = useState(0);
  const [txnHash, setTxnHash] = useState("");

  useEffect(() => {
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
          setGiftNftImage(response.data[0].nftImage);
          setGiftTitle(response.data[0].title);
          setGiftMessage(response.data[0].message);
          setGiftAmount(response.data[0].amount);
          setGiftChain(response.data[0].chain);
          setGiftChainId(Number(response.data[0].chainId));
          setLinkStatus(response.data[0].claimed);
          linkDetails(response.data[0].claimLink);
        });
    }

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

    getClaimUrl();
    provider();
  }, [isConnected]);

  async function setGiftClaimed() {
    setLoadingLink(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    await axios.post("https://api.stilto.io/setgiftclaimed", {
      id: urlParams.get("id"),
    });
  }

  const claimLink = async () => {
    setLoadingLink(true);
    if (!signer || !link) return;
    const claimTx = await peanut.claimLink({
      structSigner: {
        signer,
      },
      link: link,
    });
    setTxnHash(claimTx);
    linkDetails(link);
    setGiftClaimed();
    onOpen();
  };

  const linkDetails = async (link) => {
    const details = await peanut.getLinkDetails({ link });
    setLinkStatus(details.claimed);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(txnHash.txHash);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40] py-10">
      <section className="w-full lg:w-4/5 xl:w-2/3 flex flex-col justify-evenly items-center bg-white p-6 md:p-12 mb-6 rounded-lg shadow-lg">
        <section className="w-full min-h-1/2 relative flex flex-col items-center text-center break-all">
          {giftTitle && (
            <h1 className="w-full text-xl font-semibold text-center mb-2">
              {giftTitle}
            </h1>
          )}
          {giftMessage && (
            <p className="w-full text-center mb-4">{giftMessage}</p>
          )}
          <h2 className="mb-4">
            From: {`${giftSender.slice(0, 6)}...${giftSender.slice(36)}`}
          </h2>
          {giftAmount && <p className="mb-4">Amount: {giftAmount} ETH</p>}
          {giftAmount && <p className="mb-4">Chain: {giftChain}</p>}
          {!isLoggedIn && (
            <section className="mt-2">
              <ConnectButton />
            </section>
          )}
          {isLoggedIn && (
            <section className="flex flex-col items-center">
              {giftChainId !== connectedChainId && (
                <section>
                  <Button
                    className=" bg-red-500 mb-4 py-4 px-8 text-[#e0f7fa] font-semibold rounded-full"
                    onClick={() => switchChain({ chainId: giftChainId })}
                  >
                    Wrong network. Change to: {giftChain}
                  </Button>
                </section>
              )}
              {loadingLink && (
                <section className="flex justify-center mb-4">
                  <CircularProgress size="lg" color="success" />
                </section>
              )}
              <Button
                onClick={claimLink}
                disabled={linkStatus}
                className={`w-44 h-12 ${
                  !linkStatus
                    ? "bg-[#1de9b6] hover:bg-[#00bfa5]"
                    : "bg-[#ec583b]"
                } text-lg rounded-xl flex justify-center items-center`}
              >
                {!linkStatus ? "CLAIM" : "CLAIMED"}
              </Button>
              <Modal
                backdrop="blur"
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
                className="bg-white rounded-lg"
              >
                <ModalContent className="flex content-between text-black">
                  {(onClose) => (
                    <section className="flex flex-col py-20">
                      <ModalHeader className="flex justify-center mb-8">
                        <section>
                          <h2 className="text-xl">
                            Congratulations! You have successfully claimed your
                            gift!
                          </h2>
                          <section className="flex mt-4">
                            Transaction Hash: {txnHash.txHash.slice(0, 8)}...
                            {txnHash.txHash.slice(62)}
                            <Popover
                              placement="right"
                              size="sm"
                              className="rounded-lg"
                            >
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
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                    />{" "}
                                    <rect
                                      x="8"
                                      y="8"
                                      width="12"
                                      height="12"
                                      rx="2"
                                    />{" "}
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
                        </section>
                      </ModalHeader>
                      <ModalBody className="flex items-center">
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="rounded-lg shadow-lg"
                        >
                          <source
                            src="https://media4.giphy.com/media/P1HOxaZSTcp4k/giphy.mp4?cid=5b5901a5k8mbdmx92tvjq5nd5hhxrddk5v85tgl32r4ik2mq&ep=v1_gifs_search&rid=giphy.mp4&ct=g"
                            type="video/mp4"
                          />
                        </video>
                      </ModalBody>
                    </section>
                  )}
                </ModalContent>
              </Modal>
            </section>
          )}
        </section>
        <section className="w-full lg:w-2/3 h-full flex justify-center items-center mt-6">
          {giftCardOrGif && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-lg shadow-lg"
            >
              <source src={giftCardOrGif} type="video/mp4" />
            </video>
          )}
        </section>
        <section className="w-full lg:w-2/3 h-full flex justify-center lg:justify-end items-center mt-6">
          {giftNftImage && (
            <Image
              alt="NFT image"
              className="h-64 overflow-hidden rounded-xl"
              src={giftNftImage}
              width={270}
              height={270}
            />
          )}
        </section>
      </section>
    </section>
  );
}
