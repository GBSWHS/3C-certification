import Topbar from '../../components/Topbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import useSWR from 'swr'
import xss from 'xss'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NoticesPage () {
  const router = useRouter()
  const { data, error } = useSWR('/api/notices?id=' + router.query.id, fetcher)
  if (!data) return <div>로딩중...</div>
  if (error) return <div>오류: {error}</div>
  const { id, title, content, author, createdAt } = data.notices
  const Content = xss(content)
  return (
    <div className="w-screen">
      <Topbar />
      <div className="justify-center ttext-center w-full align-top p-10">
        <div className="flex gap-3">
          <h1 className="text-4xl font-bold">{title}</h1>
          <Link href="/" passHref><span className="bg-gray-400 text-white py-3 px-5 rounded-lg font-bold cursor-pointer">돌아가기</span></Link>
        </div>
        <p className="mt-1">{author} | {moment(createdAt).format('YYYY-MM-DD hh:mm')} | ID: {id}</p>
        <div className="mt-3" dangerouslySetInnerHTML={{ __html: Content }} />
      </div>
    </div>
  )
}
