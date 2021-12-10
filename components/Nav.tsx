import Link from 'next/link'
import Image from 'next/image'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header ({ title }: { title: string }) {
  return (
    <nav className="w-full bg-white">
      <div className="justify-between ml-3 mt-3 mb-1">
        <Link href="/" passHref><Image src={'/title.png'} alt="test7" height={50} width={220} /></Link>
      </div>
      <div className="flex justify-between bg-accent1 text-white py-3 px-4">
        <span className="font-semibold">{title}</span>
        <Link href="/" passHref><span className="cursor-pointer"><FontAwesomeIcon icon={faHome} /> 처음으로</span></Link>
      </div>
    </nav>
  )
}
