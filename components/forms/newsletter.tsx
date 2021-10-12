import type { FormEvent } from 'react'

export default function Newsletter() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      email: {
        value: string
      }
    }

    try {
      const email = target.email.value

      const r = await fetch(`/api/newsletter/subscribe`, {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (r.ok) {
        return
      }

      throw new Error((await r.json()).error)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form method='POST' onSubmit={handleSubmit}>
      <label htmlFor='email' className='mr-4'>
        Email
      </label>

      <input
        className='mb-4'
        autoComplete='email'
        id='email'
        name='email'
        placeholder='name@email.com'
        required
        type='email'
      />
      <br />
      <button type='submit' className='border p-2'>
        Subscribe
      </button>
    </form>
  )
}
