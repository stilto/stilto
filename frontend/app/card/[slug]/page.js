import ClaimGift from "../../components/claimGift";
import Footer from "../../components/footer";

export default async function Page({ params }) {
  return (
    <section>
      <ClaimGift />
      <Footer />
    </section>
  );
}
