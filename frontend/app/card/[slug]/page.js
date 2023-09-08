import { prisma } from "@/app";

function getGifts() {
  return prisma.gift.findMany();
}

export default async function Page({ params }) {
  const gifts = await getGifts();

  return (
    <section>
      <p>page: {params.slug}</p>
      {console.log("hej", gifts)}
      {gifts.map((i, key) => (
        <section key={key}>
          <p>{i.title}</p>
        </section>
      ))}
    </section>
  );
}
