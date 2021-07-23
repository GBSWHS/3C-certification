import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Topbar () {
  const router = useRouter()

  return (
    <nav id="top" className="border-b-2 w-full px-10 text-lg">
      <div className="flex">
        <div className="inline-flex gap-5 align-middle p-5">
          <Link href="/">
            <div>
              <Image src="/images/logo.png" width={60} height={60} alt="logo" priority/>
              <span className="text-xs">3C인증제</span>
            </div>
          </Link>
          <Link href="/">
            <div className={`rounded-md self-center font-bold cursor-pointer ml-5 p-3 ${router.asPath === '/' ? 'bg-accent1' : ''}`}>
              공지사항
            </div>
          </Link>
          <Link href="/about">
            <div className={`rounded-md self-center font-bold cursor-pointer p-3 ${router.asPath === '/about' ? 'bg-accent1' : ''}`}>
              3C 인증제란?
            </div>
          </Link>
          <Link href="list">
            <div className={`rounded-md self-center font-bold cursor-pointer p-3 ${router.asPath === '/list' ? 'bg-accent1' : ''}`}>
              목록
            </div>
          </Link>
          <Link href="/profile">
            <div className={`rounded-md self-center font-bold cursor-pointer p-3 ${router.asPath === '/profile' ? 'bg-accent2' : ''}`}>
              내정보
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
