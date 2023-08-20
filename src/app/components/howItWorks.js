import Image from "next/image";

import StiltoGuide from "../assets/stilto-guide.png";

export default function HowItWorksComp() {
  return (
    <section className="min-h-screen flex justify-center bg-white text-black">
      <Image
        src={StiltoGuide}
        alt="Stilto guide"
        width={650}
        height={650}
        className="h-5/6 mt-8 rounded-xl"
      />
    </section>
  );
}
