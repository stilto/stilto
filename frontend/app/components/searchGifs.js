"use client";
import { useContext, useState } from "react";
import Link from "next/link";

import Context from "../utils/context";

export default function SearchGifs() {
  const { chosenGif, setChosenGif } = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const [gifsFetched, setGifsFetched] = useState([]);
  const [isGifsFetched, setIsGifsFetched] = useState(false);

  const API_URI = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=`;
  const parameters =
    "&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    document.querySelector("#inputField").value = "";
    fetch(`${API_URI}${inputValue}${parameters}`)
      .then((res) => res.json())
      .then((data) => {
        setGifsFetched(data.data);
        setIsGifsFetched(true);
        console.log("data", data.data);
      });
  };

  const useGif = (e) => {
    setChosenGif(e);
    console.log("eeee", e);
  };

  return (
    <section className="w-full flex flex-col items-center lg:items-end my-10 bg-[#e0f7fa] text-[#004d40]">
      <section className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 flex justify-center lg:justify-start">
        <input
          className="w-2/3 h-10 pl-2 bg-white text-[#004d40] text-base outline-none border-2 border-[#004d40] rounded-l-lg"
          type="text"
          id="inputField"
          name="inputField"
          maxLength="120"
          required
          onChange={handleChange}
        />
        <button
          className="w-1/8 h-10 px-8 bg-[#1de9b6] hover:bg-[#00bfa5] text-[#004d40] text-base font-semibold outline-none border-none rounded-r-lg cursor-pointer uppercase"
          onClick={handleSubmit}
        >
          Search
        </button>
      </section>
      <section className="w-full">
        {!isGifsFetched ? (
          <section className="flex justify-center">
            <p className="my-10 text-2xl font-semibold">Search for gifs</p>
          </section>
        ) : (
          <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-10 justify-items-center my-10">
            {gifsFetched.map((i, key) => {
              return (
                <section
                  key={key}
                  className="w-full flex flex-col items-center shadow-lg rounded-lg bg-white"
                >
                  <video
                    autoPlay
                    muted
                    loop
                    key={key}
                    className="w-48 lg:w-60 h-48 lg:h-60 mt-6 rounded-lg"
                  >
                    <source src={i.images.original.mp4} type="video/mp4" />
                  </video>
                  <Link href="/add-message" className="mb-4">
                    <button
                      className="w-36 h-10 bg-[#1de9b6] hover:bg-[#00bfa5] text-[#004d40] border border-[#1de9b6] hover:border-[#00bfa5] rounded-full"
                      onClick={() => useGif(i.images.original.mp4)}
                    >
                      Use this gif
                    </button>
                  </Link>
                </section>
              );
            })}
          </section>
        )}
      </section>
    </section>
  );
}
