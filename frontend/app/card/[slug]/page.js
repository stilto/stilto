import ClaimButton from "../../components/claimButton";
import Footer from "../../components/footer";

export default async function Page({ params }) {
  return (
    <section>
      <p>page: {params.slug}</p>
      <ClaimButton />
      <Footer />
    </section>
  );
}
