import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

import HBCard from "../assets/hb-startPage.png";
import NYCard from "../assets/ny-startPage.png";

export default function Hero() {
  return (
    <section className="w-full flex justify-center bg-[#e0f7fa] py-24 overflow-hidden">
      <section className="w-full flex flex-col md:flex-row items-center">
        <section className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={NYCard}
            alt="Happy New Year Card with Crypto Coin"
            width={300}
            height={300}
            className="md:w-1/2 xl:w-auto origin-left rotate-12 z-20 drop-shadow-2xl"
          />
          <Image
            src={HBCard}
            alt="Happy Birthday Card with Crypto Coin"
            width={300}
            height={300}
            className="md:w-1/2 xl:w-auto md:mr-10 origin-bottom-left -rotate-12 drop-shadow-2xl"
          />
        </section>
        <section className="w-3/4 md:w-1/2 h-full flex flex-col justify-center mt-20 md:mt-0">
          <p
            className={`${poppins.className} w-full text-[#004d40] text-2xl md:text-2xl lg:text-4xl font-semibold`}
          >
            Send Crypto with a Personal Touch
            <br /> via Digital Cards or Gifs
          </p>
          <p className="md:w-2/3 text-[#004d40] mt-10 md:text-lg">
            Craft digital greeting cards or pick a fun gif, add your heartfelt
            message, and send crypto to a friend who can claim it through a
            link.
          </p>
          <Link href="/add-card" className="w-44 mt-6">
            <button className="w-44 h-12 bg-[#1de9b6] hover:bg-[#00bfa5] text-lg rounded-xl">
              Start Sending
            </button>
          </Link>
        </section>
      </section>
    </section>
  );
}
