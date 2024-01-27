"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { peanut } from "@squirrel-labs/peanut-sdk";
import axios from "axios";
import { useAccount, useNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function ClaimButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentAccount, setCurrentAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [link, setLink] = useState("");
  const [linkStatus, setLinkStatus] = useState(false);

  const [giftSender, setGiftSender] = useState("");
  const [giftCardOrGif, setGiftCardOrGif] = useState("");
  const [giftTitle, setGiftTitle] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftAmount, setGiftAmount] = useState("");
  const [giftChain, setGiftChain] = useState("");
  const [giftChainId, setGiftChainId] = useState(0);

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
          setGiftChain(response.data[0].chain);
          setGiftChainId(Number(response.data[0].chainId));
          setLinkStatus(response.data[0].claimed);
          linkDetails(response.data[0].claimLink);
        });
    }

    getClaimUrl();
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

  async function setGiftClaimed() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    await axios.post("https://api.stilto.io/setgiftclaimed", {
      id: urlParams.get("id"),
    });
  }

  const claimLink = async () => {
    if (!signer || !link) return;
    const claimTx = await peanut.claimLink({
      structSigner: {
        signer,
      },
      link: link,
    });
    linkDetails(link);
    setGiftClaimed();
    onOpen();
  };

  const linkDetails = async (link) => {
    const details = await peanut.getLinkDetails({ link });
    setLinkStatus(details.claimed);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40] py-10">
      <section className="w-full lg:w-4/5 xl:w-2/3 flex flex-col lg:flex-row bg-white p-6 md:p-12 lg:p-8 mb-6 rounded-lg shadow-lg">
        <section className="w-full lg:w-1/2 min-h-1/2 relative flex flex-col items-center lg:items-start lg:pr-4 text-center lg:text-left break-all">
          {giftTitle && (
            <h1 className="w-full text-xl font-semibold text-center mb-2">
              {giftTitle}
            </h1>
          )}
          {giftMessage && (
            <p className="w-full text-center mb-4">{giftMessage}</p>
          )}
          <h2 className="mb-4">From: {giftSender}</h2>
          {giftAmount && <p className="mb-4">Amount: {giftAmount} ETH</p>}
          {giftAmount && <p className="mb-4">Chain: {giftChain}</p>}
          {!currentAccount && (
            <button
              onClick={() => open({ view: "Networks" })}
              className="w-60 h-14 absolute bottom-0 bg-[#1de9b6] hover:bg-[#00bfa5] text-white text-lg mt-6 rounded-xl uppercase"
            >
              Connect Wallet
            </button>
          )}
          {currentAccount && (
            <section>
              {chain && chain.id && giftChainId !== chain.id && (
                <section>
                  {console.log("chhh", chain)}
                  <Button
                    className=" bg-red-500 mb-4 py-4 px-8 text-[#e0f7fa] font-semibold rounded-full"
                    onClick={() => open({ view: "Networks" })}
                  >
                    Wrong network. Change to: {giftChain}
                  </Button>
                </section>
              )}
              <button
                onClick={claimLink}
                disabled={linkStatus}
                className={`w-44 h-12 lg:absolute lg:bottom-0 ${
                  !linkStatus
                    ? "bg-[#1de9b6] hover:bg-[#00bfa5]"
                    : "bg-[#ec583b]"
                } text-lg rounded-xl flex justify-center items-center`}
              >
                {!linkStatus ? "CLAIM" : "CLAIMED"}
              </button>
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
                        <h2 className="text-xl">Congratulations!</h2>
                      </ModalHeader>
                      <ModalBody className="flex items-center">
                        <video
                          autoPlay
                          muted
                          loop
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
        <section className="w-full lg:w-2/3 h-full flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
          {giftCardOrGif && (
            <video autoPlay muted loop className="w-full rounded-lg shadow-lg">
              <source src={giftCardOrGif} type="video/mp4" />
            </video>
          )}
        </section>
      </section>
    </section>
  );
}
