import About from "../components/About";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewsletterSection from "../components/Newsletter";
import StayTuned from "../components/StayTuned";

const Splash = () => {
  return (
    <div className="relative">
      <Hero />
      <Banner color="black">
        <StayTuned />
      </Banner>
      <NewsletterSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Splash;
