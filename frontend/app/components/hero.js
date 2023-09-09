import Link from "next/link";
import Image from "next/image";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ weight: "400", subsets: ["greek"] });

import HBCard from "../assets/hb-startPage.png";
import NYCard from "../assets/ny-startPage.png";

export default function Hero() {
  return (
    <section className="w-full flex justify-center bg-[#EAE0CC] py-24 overflow-hidden">
      <section className="w-full flex flex-col md:flex-row items-center">
        <section className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={NYCard}
            alt="Happy New Year Card"
            width={300}
            height={300}
            className="md:w-1/2 xl:w-auto origin-left rotate-12 z-20 drop-shadow-2xl"
          />
          <Image
            src={HBCard}
            alt="Happy Birthday Card"
            width={300}
            height={300}
            className="md:w-1/2 xl:w-auto md:mr-10 origin-bottom-left -rotate-12 drop-shadow-2xl"
          />
        </section>
        <section className="w-3/4 md:w-1/2 h-full flex flex-col justify-center mt-20 md:mt-0">
          <p
            className={`${ubuntu.className} w-full text-gray-900 text-2xl md:text-2xl lg:text-4xl font-semibold`}
          >
            The easiest way to send crypto
            <br /> along with a digital greeting card or a gif
          </p>
          <p className="md:w-2/3 text-gray-900 mt-10 md:text-lg">
            Create digital greeting cards or choose a gif, add your personal
            message, and send the desired crypto amount to a friend that claims
            via a link.
          </p>
          <Link href="/add-card" className="mt-6">
            <button className="w-44 h-12 bg-[#877b9a] hover:bg-[#8f82a5] text-lg rounded-xl">
              Start Sending
            </button>
          </Link>
        </section>
      </section>
    </section>
  );
}
