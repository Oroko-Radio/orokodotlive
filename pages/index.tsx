import type { NextPage } from 'next'
import Newsletter from '../components/forms/newsletter'

const Home: NextPage = () => {
  return (
    <main>
      <h1>Oroko Radio - Coming soon!</h1>

      <div>
        <Newsletter />
      </div>
    </main>
  )
}

export default Home
