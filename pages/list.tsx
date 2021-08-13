import Topbar from '../components/Topbar'
import Notices from '../components/Lists'
import Link from 'next/link'
import Head from '../components/Head'
import useSWR from 'swr'
import { faBell, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function List () {
  const { data, error } = useSWR('/api/lists', fetcher)

  return (
    <div className="w-screen">
      <Head subtitle="3c 인증목록" />
      <Topbar />
      <div className="flex justify-center">
        <div className="inline-block w-full align-top p-10 container">
          <div className="text-center">
            <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2"><FontAwesomeIcon icon={faBell}/> 3c 인증목록</h1>
          </div>
          <Notices />
          <div className="mt-10">
            {!error && data?.success && data?.type === true
              ? <Link href="/cms/notice_write" passHref><span className="text-white bg-blue-400 hover:bg-blue-500 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faPenAlt}/> 공지 작성</span></Link>
              : <></>}
          </div>
        </div>
      </div>
    </div>
  )
}
