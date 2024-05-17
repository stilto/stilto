import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
import GC from "../assets/gc.png";
import Wallet from "../assets/wallet.png";
import Send from "../assets/send.png";
import arbitrum from "../assets/chains/arbitrum.svg";
import avalanche from "../assets/chains/avalanche.svg";
import base from "../assets/chains/base.svg";
import bsc from "../assets/chains/bsc.svg";
import mainnet from "../assets/chains/mainnet.svg";
import polygon from "../assets/chains/polygon.svg";
import optimism from "../assets/chains/optimism.svg";

const logos = [
  <Image src={arbitrum} alt="Arbitrum" key={arbitrum} className="w-16 h-16" />,
  <Image
    src={avalanche}
    alt="Avalanche"
    key={avalanche}
    className="w-16 h-16"
  />,
  <Image src={base} alt="Base" key={base} className="w-16 h-16" />,
  <Image src={bsc} alt="BSC" key={bsc} className="w-16 h-16" />,
  <Image src={mainnet} alt="Mainnet" key={mainnet} className="w-16 h-16" />,
  <Image src={polygon} alt="Polygon" key={polygon} className="w-16 h-16" />,
  <Image src={optimism} alt="Optimism" key={optimism} className="w-16 h-16" />,
];

export default function HomeComp() {
  return (
    <section className="w-full flex flex-col items-center text-gray-900 mt-6">
      <h1 className={`${poppins.className} text-3xl font-semibold`}>
        SUPPORTED NETWORKS
      </h1>
      <InfiniteSlider />
      <h1 className={`${poppins.className} text-3xl font-semibold`}>
        HOW IT WORKS
      </h1>
      <section className="w-3/4 flex flex-col md:flex-row md:justify-between mt-8">
        <section className="flex flex-col items-center mt-10 px-2">
          <Image src={GC} alt="greeting card" width={100} height={100} />
          <p className="text-xl font-semibold text-center mt-2">Pick a card</p>
          <p className="text-lg mt-2 text-center">
            Choose one of our beautiful cards
          </p>
        </section>
        <section className="flex flex-col items-center mt-10 px-10">
          <Image src={Wallet} alt="crypto wallet" width={100} height={100} />
          <p className="text-xl font-semibold text-center mt-2">
            Add crypto & message
          </p>
          <p className="text-lg mt-2 text-center">
            Add the crypto amount you want to give, along with a thoughtful or
            funny message
          </p>
        </section>
        <section className="flex flex-col items-center mt-10 px-2">
          <Image src={Send} alt="send crypto" width={100} height={100} />
          <p className="text-xl font-semibold text-center mt-2">Send</p>
          <p className="text-lg mt-2 text-center">
            Send the unique link to your friend
          </p>
        </section>
      </section>
      <Link href="/add-card" className="my-20">
        <button className="w-64 h-16 bg-[#1de9b6] hover:bg-[#00bfa5] text-white text-xl rounded-xl">
          Start Sending
        </button>
      </Link>
      <section className="w-full flex flex-col items-center bg-[#e0f7fa] pt-8 pb-20">
        <section className="w-full flex flex-col lg:flex-row items-start mt-12">
          <section className="w-full lg:w-1/2 text-center lg:text-left text-lg px-10 sm:px-20 md:px-40 lg:px-10 lg:pr-0 text-[#004d40]">
            <h1
              className={`${poppins.className} text-[#004d40] md:ml-10 text-3xl font-semibold`}
            >
              GIFt Crypto
            </h1>
            <p className="text-lg mt-2 md:ml-10">
              Express yourself with animated fun!
            </p>
            <p className="mt-4 md:ml-10">
              Prefer a lively GIF over a static card? Browse our extensive GIF
              library to find the perfect animation for your occasion, add your
              personal message, and surprise your friends with crypto in a fun
              way!
            </p>
          </section>
          <section className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <video
              autoPlay
              muted
              loop
              controls
              controlsList="nofullscreen"
              className="w-full h-96 rounded-lg"
            >
              <source src="/giphy.mp4" type="video/mp4" />
            </video>
          </section>
        </section>
      </section>

      <section className="w-2/3 mt-8">
        <section className="flex items-center divide-x divide-black my-4">
          <section className="flex items-center space-x-4 text-black pr-8">
            <section className="space-y-1 font-medium">
              <p>Tom</p>
            </section>
          </section>
          <section className="pl-8">
            <section className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <h3 className="ml-2 text-sm font-semibold text-gray-600">
                The perfect gift, will definitely buy another one!
              </h3>
            </section>
            <section className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                Reviewed in the UAE on{" "}
                <time dateTime="2017-03-03 19:00">November 20, 2023</time>
              </p>
            </section>
          </section>
        </section>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          So far Stilto has been the easiest and most convenient way to send
          crypto gifts. I&apos;m amazed that so many gift cards are available
          and any GIF can also be used to surprise my friends!
        </p>
      </section>

      <Link href="/add-card" className="my-20">
        <button className="w-64 h-16 bg-[#1de9b6] hover:bg-[#00bfa5] text-white text-xl rounded-xl">
          Start Sending
        </button>
      </Link>
    </section>
  );
}

const InfiniteSlider = () => {
  return (
    <section className="relative flex overflow-x-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      <section className="flex items-center py-12 animate-marquee whitespace-nowrap">
        {logos.map((logo, i) => {
          return (
            <span className="text-4xl mx-4" key={i}>
              {logo}
            </span>
          );
        })}
      </section>

      <section className="flex items-center absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
        {logos.map((logo, i) => {
          return (
            <span className="text-4xl mx-4" key={i}>
              {logo}
            </span>
          );
        })}
      </section>
    </section>
  );
};
