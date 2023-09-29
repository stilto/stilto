import Link from "next/link";
import Image from "next/image";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ weight: "400", subsets: ["greek"] });
import GC from "../assets/gc.png";
import Wallet from "../assets/wallet.png";
import Send from "../assets/send.png";

export default function HomeComp() {
  return (
    <section className="w-full flex flex-col items-center text-gray-900 mt-10">
      <h1 className={`${ubuntu.className} text-3xl font-semibold`}>
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
        <button className="w-64 h-16 bg-[#877b9a] hover:bg-[#8f82a5] text-white text-xl rounded-xl">
          Start Sending
        </button>
      </Link>
      <section className="w-full flex flex-col items-center bg-[#EAE0CC] pt-8 pb-20">
        <h1 className={`${ubuntu.className} text-3xl font-semibold`}>
          ADD GIFS
        </h1>
        <p className="text-lg mt-2">
          Want to send a GIF with crypto? No worries!
        </p>
        <section className="w-full flex flex-col lg:flex-row items-center mt-12">
          <section className="w-full lg:w-2/3 flex justify-center">
            {/* <video
              autoPlay
              muted
              loop
              className="w-48 lg:w-64 h-48 lg:h-64 rounded-lg"
            >
              <source src="/hb.mp4" type="video/mp4" />
            </video> */}
            <video autoPlay muted loop className="w-full h-96 rounded-lg">
              <source src="/gm.mp4" type="video/mp4" />
            </video>
            {/* <video
              autoPlay
              muted
              loop
              className="w-48 lg:w-60 h-48 lg:h-60 mt-10 -ml-12 rounded-lg"
            >
              <source src="/to.mp4" type="video/mp4" />
            </video> */}
          </section>
          <section className="w-full lg:w-1/3 text-center lg:text-left text-lg mt-8 lg:mt-0 lg:-ml-24 xl:-ml-32 2xl:-ml-44 px-10 sm:px-20 md:px-40 lg:px-0 lg:pr-10">
            <p>
              Want to send a GIF instead of a card? That&apos;s not an issue!
              Search through our library of GIFs and choose the best one for the
              occasion
            </p>
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
        <button className="w-64 h-16 bg-[#877b9a] hover:bg-[#8f82a5] text-white text-xl rounded-xl">
          Start Sending
        </button>
      </Link>
    </section>
  );
}
