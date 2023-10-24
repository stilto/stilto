import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
import GC from "../assets/gc.png";
import Wallet from "../assets/wallet.png";
import Send from "../assets/send.png";

export default function HomeComp() {
  return (
    <section className="w-full flex flex-col items-center text-gray-900 mt-10">
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
            <video autoPlay muted loop className="w-full h-96 rounded-lg">
              <source src="/giphy.mp4" type="video/mp4" />
            </video>
          </section>
        </section>
      </section>

      <section className="w-2/3 mt-8">
        <section className="flex items-center divide-x divide-black my-4">
          <section className="flex items-center space-x-4 text-black pr-8">
            {/* <Image
            className="w-10 h-10 rounded-full"
            src={GC}
            alt="Profile pic"
          /> */}
            <section className="space-y-1 font-medium">
              <p>
                Jese Leos
                {/* <time
                  dateTime="2014-08-16 19:00"
                  className="block text-sm text-gray-500 dark:text-gray-400"
                >
                  September 2023
                </time> */}
              </p>
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
                className="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1"
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
                Reviewed in the United Kingdom on{" "}
                <time dateTime="2017-03-03 19:00">September 3, 2023</time>
              </p>
            </section>
          </section>
        </section>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          This is my third Invicta Pro sectioner. They are just fantastic value
          for money. This one arrived yesterday and the first thing I did was
          set the time, popped on an identical strap from another Invicta and
          went in the shower with it to test the waterproofing.... No problems.
        </p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          It is obviously not the same build quality as those very expensive
          watches. But that is like comparing a Citroën to a Ferrari. This watch
          was well under £100! An absolute bargain.
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
