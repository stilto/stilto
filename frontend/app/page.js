import Header from "./components/header";
import Hero from "./components/hero";
import HomeComp from "./components/home";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Header />
      <Hero />
      <HomeComp />
      <Footer />
    </main>
  );
}
