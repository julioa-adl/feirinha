import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <Link href={"/login"} className='text-blue-600'>Login</Link>
    </>
  )
}
