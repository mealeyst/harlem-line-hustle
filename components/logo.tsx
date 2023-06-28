import Image from 'next/image'
import src from '../public/harlem-line-hustle-inline.svg'

console.log(src)

export const Logo = () => (
  <Image
    src={src}
    alt='Harlem Line Hustle'
    height={40}
    width={300}
  />
)