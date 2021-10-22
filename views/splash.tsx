import About from '../components/About'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import NewsletterSection from '../components/NewsletterSection'

const Splash = () => {
  return (
    <div>
      <Hero />
      <Banner color='black' />
      <NewsletterSection />
      <About />
    </div>
  )
}

export default Splash
