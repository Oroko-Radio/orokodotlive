import type { NextPage } from 'next'
import Newsletter from '../components/forms/newsletter'

const Home: NextPage = () => {
  return (
    <main>
      <div className='mx-auto w-1/2 mt-60'>
        <h1 className='font-bold mb-8 text-4xl'>Oroko Radio - Coming soon!</h1>

        <div>
          <Newsletter />
        </div>
      </div>
    </main>
  )
}

export default Home
