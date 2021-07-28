import Topbar from '../../components/Topbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import useSWR from 'swr'
import xss from 'xss'
import Head from '../../components/Head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NoticesPage () {
  const router = useRouter()
  const { data, error } = useSWR('/api/notices?id=' + router.query.id, fetcher)
  if (!data) return <div className="w-screen"><Topbar /><div>로딩중...</div></div>
  if (error) return <div className="w-screen"><Topbar /><div>오류: {error}</div></div>
  if (!data.success) return <div className="w-screen"><Topbar /><div>오류: {data.message}</div></div>

  const { id, title, content, author, createdAt } = data.notices

  return (
    <div className="w-screen">
      <Head subtitle={`${title} (#${id})`}/>
      <Topbar />
      <div className="text-center pt-10">
        <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2">공지사항</h1>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-full container xl:px-64 md:px-32">
          <div className="flex gap-3 border-b-2 pb-3">
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <p className="mt-1 font-thin">{author} | {moment(createdAt).format('YYYY-MM-DD hh:mm')} | ID: {id}</p>

          <div className="my-10" dangerouslySetInnerHTML={{ __html: xss(content) }} />
          <hr />
          <div className="mt-6">
            <Link href="/" passHref><span className="text-gray-400 border-2 hover:border-0 hover:bg-gray-400 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faArrowRight} /> 돌아가기</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
