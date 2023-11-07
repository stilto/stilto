import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function HowItWorksComp() {
  return (
    <section className="min-h-screen flex flex-col items-center bg-[#e0f7fa] text-[#004d40] py-8">
      <h1 className={`${poppins.className} text-4xl font-semibold my-4`}>
        How It Works
      </h1>
      <section className="flex flex-col md:flex-row md:justify-center md:space-x-8 mt-12 w-full px-4">
        {[
          {
            title: "Select Your Medium",
            description:
              "Pick the occasion and decide whether you'd like to send a traditional card or a fun gif to mark the celebration.",
          },
          {
            title: "Craft Your Message",
            description:
              "Pen down a heartfelt title and message, or let your humor shine through with a witty joke or two.",
          },
          {
            title: "Set Your Gift Amount",
            description:
              "Specify the amount of cryptocurrency you wish to gift alongside your chosen card or gif.",
          },
          {
            title: "Complete Your Payment",
            description:
              "Choose to pay using cryptocurrency through your wallet, or simply use your debit card.",
          },
          {
            title: "Share and Await Reactions",
            description:
              "We'll generate a unique link encapsulating your card/gif and gift amount. Share it with the recipient and wait for their joyous reaction!",
          },
        ].map((step, index) => (
          <section
            className="flex flex-col items-center md:items-start mt-8 md:mt-0 bg-white p-6 rounded-lg shadow-lg transition-transform transform-gpu hover:scale-105"
            key={index}
          >
            <section className="bg-[#1de9b6] text-[#004d40] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              {index + 1}
            </section>
            <h2 className={`${poppins.className} text-2xl font-semibold mb-2`}>
              {step.title}
            </h2>
            <p className="text-center md:text-left">{step.description}</p>
          </section>
        ))}
      </section>
    </section>
  );
}
