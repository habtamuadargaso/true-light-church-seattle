import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServiceTimes from "@/components/ServiceTimes";
import Ministries from "@/components/Ministries";
import Sermons from "@/components/Sermons";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Mission from "@/components/Mission";
import Giving from "@/components/Giving";
import Visit from "@/components/Visit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-cream text-[#1b2430]">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ServiceTimes />
        <Ministries />
        <Sermons />
        <Gallery />
        <Events />
        <Mission />
        <Giving />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
