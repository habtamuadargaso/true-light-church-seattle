import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <Navbar />
      <main id="main-content">
      <section className="mx-auto flex max-w-[600px] flex-col items-center gap-5 px-[5%] py-32 text-center">
        <span className="font-serif text-6xl font-bold text-navy">404</span>
        <h1 className="font-serif text-2xl font-bold text-navy">
          Sermon not found
        </h1>
        <p className="text-[#5b6472]">
          The message you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button href="/sermons" variant="outline-dark">
          Back to all sermons
        </Button>
        <Link href="/" className="text-sm text-[#5b6472] underline">
          Return home
        </Link>
      </section>
      </main>
      <Footer />
    </div>
  );
}
