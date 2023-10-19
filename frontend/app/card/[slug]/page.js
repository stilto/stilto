import ClaimButton from "../../components/claimButton";

export default async function Page({ params }) {
  return (
    <section>
      <p>page: {params.slug}</p>
      <ClaimButton />
    </section>
  );
}
