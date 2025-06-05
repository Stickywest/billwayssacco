
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";
import AboutValues from "@/components/AboutValues";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutValues />
        <Features />
        <Services />
        <Testimonials />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
