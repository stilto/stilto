"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Context from "../utils/context";
import Card1 from "../assets/cards/1.png";

export default function AddMessageComp() {
  const { chosenGif, chosenCard, setTitle, setMessage } = useContext(Context);
  const [titleValue, setTitleValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessageValue(e.target.value);
  };

  const saveTitleAndMessage = () => {
    setTitle(titleValue);
    setMessage(messageValue);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40]">
      <section className="w-full h-20 lg:h-12 flex justify-center mt-2">
        <section className="w-full lg:w-1/2 h-20 lg:h-12 flex justify-evenly items-center text-xl text-center">
          <Link href="/add-card">
            <span className="font-semibold">1.</span> Choose gift type
          </Link>
          <Link href="/add-message" className="text-[#1de9b6]">
            <span className="font-semibold">2.</span> Add your message
          </Link>
          <Link href="/add-crypto">
            <span className="font-semibold">3.</span> Add crypto amount
          </Link>
        </section>
      </section>
      <section className="w-full min-h-screen flex flex-col lg:flex-row lg:justify-center items-center lg:items-start bg-[#e0f7fa] text-[#004d40] mt-6">
        <section className="w-full h-96 flex flex-col lg:justify-center items-center lg:items-end mt-14 lg:mr-10">
          <section className="w-full lg:w-full flex lg:justify-end items-center sm:pl-4">
            <h1 className="w-1/6 text-lg mr-6">Card title</h1>
            <input
              className="w-2/3 h-10 pl-2 bg-white text-[#004d40] text-base outline-none border-2 border-[#004d40] rounded-lg"
              type="text"
              id="inputField"
              name="inputField"
              maxLength="120"
              required
              onChange={handleTitleChange}
            />
          </section>
          <section className="w-full flex lg:justify-end mt-6 sm:pl-4">
            <h1 className="w-1/6 text-lg mr-6">Message</h1>
            <textarea
              className="w-2/3 h-36 p-2 bg-white text-[#004d40] text-base outline-none border-2 border-[#004d40] rounded-lg"
              type="text"
              id="inputField"
              name="inputField"
              maxLength="250"
              required
              onChange={handleMessageChange}
            />
          </section>
          <section className="w-1/2 flex justify-center lg:justify-end">
            <Link href="/add-crypto">
              <button
                className="w-44 h-12 bg-[#1de9b6] hover:bg-[#00bfa5] text-lg text-[#004d40] mt-6 rounded-xl"
                onClick={saveTitleAndMessage}
              >
                Continue
              </button>
            </Link>
          </section>
        </section>
        <section className="w-full h-full flex flex-col items-center lg:ml-10">
          {chosenGif !== "" ? (
            <video
              autoPlay
              muted
              loop
              className="w-96 h-full lg:mt-10 rounded-lg shadow-lg"
            >
              <source src={chosenGif} type="video/mp4" />
            </video>
          ) : (
            chosenCard && (
              <section className="flex flex-col items-center border-2 rounded-lg shadow-lg bg-white">
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
        </section>
      </section>
    </section>
  );
}
