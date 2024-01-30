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
  const [loadingLink, setLoadingLink] = useState(false);

  const [giftSender, setGiftSender] = useState("");
  const [giftCardOrGif, setGiftCardOrGif] = useState("");
  const [giftNftImage, setGiftNftImage] = useState("");
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
          console.log("res", response.data[0]);
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
          <h2 className="mb-4">
            From: {`${giftSender.slice(0, 6)}...${giftSender.slice(36)}`}
          </h2>
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
              {loadingLink && (
                <section className="text-center mt-4">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-300 animate-spin dark:fill-[#00bfa5]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </section>
              )}
              <Button
                onClick={claimLink}
                disabled={linkStatus}
                className={`w-44 h-12 lg:absolute lg:bottom-0 ${
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
        <section className="w-full lg:w-2/3 h-full flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
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
