import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SessionNav from './SessionNav'

export default function Topbar () {
  const router = useRouter()

  return (
    <nav id="top" className="border-b-2 w-full px-10 text-lg">
      <div className="flex justify-between">
        <div className="inline-flex gap-5 align-middle p-5">
          <Link passHref href="/">
            <div>
              <Image src="/logo.png" width={60} height={60} alt="logo" priority/>
              <span className="text-xs">3C인증제</span>
            </div>
          </Link>
          <Link passHref href="/">
            <div className={`rounded-md self-center font-bold cursor-pointer ml-5 p-3 ${router.asPath === '/' ? 'bg-accent1' : ''}`}>
              공지사항
            </div>
          </Link>
          <Link passHref href="/about">
            <div className={`rounded-md self-center font-bold cursor-pointer p-3 ${router.asPath === '/about' ? 'bg-accent1' : ''}`}>
              3C 인증제란?
            </div>
          </Link>
          <Link passHref href="list">
            <div className={`rounded-md self-center font-bold cursor-pointer p-3 ${router.asPath === '/list' ? 'bg-accent1' : ''}`}>
              목록
            </div>
          </Link>
          <Link passHref href="/profile">
            <div className={`rounded-md self-center font-bold cursor-pointer p-3 ${router.asPath === '/profile' ? 'bg-accent2' : ''}`}>
              내정보
            </div>
          </Link>
        </div>
        <SessionNav />
      </div>
    </nav>
  )
}
