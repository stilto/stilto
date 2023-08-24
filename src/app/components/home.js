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
            Chose one of our beautiful cards
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
      <Link href="/new-card">
        <button className="w-64 h-16 bg-[#877b9a] hover:bg-[#8f82a5] text-white text-xl my-20 rounded-xl">
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
            <video
              autoPlay
              muted
              loop
              className="w-48 lg:w-64 h-48 lg:h-64 rounded-lg"
            >
              <source src="/hb.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              muted
              loop
              className="w-48 lg:w-56 h-48 lg:h-56 mt-36 -ml-32 rounded-lg"
            >
              <source src="/gm.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              muted
              loop
              className="w-48 lg:w-60 h-48 lg:h-60 mt-10 -ml-12 rounded-lg"
            >
              <source src="/to.mp4" type="video/mp4" />
            </video>
          </section>
          <section className="w-full lg:w-1/3 text-center text-lg mt-8 lg:mt-0 px-10 sm:px-20 md:px-40 lg:px-0 lg:pr-10">
            <p>
              Want to send a GIF instead of a card? That&apos;s not an issue!
              Search through our library of GIFs and chose the best one for the
              occasion
            </p>
          </section>
        </section>
      </section>
      <Link href="/new-card">
        <button className="w-64 h-16 bg-[#877b9a] hover:bg-[#8f82a5] text-white text-xl my-20 rounded-xl">
          Start Sending
        </button>
      </Link>
    </section>
  );
}
