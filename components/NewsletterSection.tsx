import Image from 'next/image'
import Newsletter from './forms/newsletter'

const NewsletterSection = () => {
  return (
    <div className='relative h-96 flex flex-col justify-center items-center text-center border-b-2 border-black'>
      <Image
        src='/images/Newsletter BG.svg'
        alt=''
        layout='fill'
        className='-z-10'
        objectFit='cover'
      />
      <p className='font-bold text-2xl mb-4'>Newsletter</p>
      <h2 className='font-serif text-5xl mb-4'>
        Receive all the news about Oroko!
      </h2>
      <p className='font-serif mb-4 max-w-sm'>
        Be part of the OROKO Family and stay in touch for all updates and future
        plans.
      </p>
      <Newsletter />
    </div>
  )
}

export default NewsletterSection
