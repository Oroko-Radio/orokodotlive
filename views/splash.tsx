import About from "../components/About";
import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Logo from "../components/Logo";
import NewsletterSection from "../components/Newsletter";
import StayTuned from "../components/StayTuned";

const Splash = () => {
  return (
    <div className="relative">
      <Logo />
      <Hero />
      <Banner color="black">
        <StayTuned />
      </Banner>
      <NewsletterSection />
      <About />
      <Contact />
      <Footer />
      {/* test 2 */}
    </div>
  );
};

export default Splash;
