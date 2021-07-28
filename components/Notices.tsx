import moment from 'moment'
import Link from 'next/link'
import useSWR from 'swr'

interface NoticeData {
  id: number
  title: string
  content: string
  createdAt: string
  author: string
  memberOnly: boolean
}
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Notices () {
  const { data, error } = useSWR('/api/notices', fetcher)

  if (!data) return <div>로딩중...</div>
  if (error) return <div>오류: {error}</div>

  return (
    <div className="mt-3">
      {data.notices.map((notice: NoticeData, i: number) => (
        <div className="mt-8" key={i}>
          <Link href={'/notice/' + notice.id} passHref>
            <div className="cursor-pointer rounded-sm border-2 hover:border-blue-300 p-8">
              <h3 className="text-xl">{notice.title}</h3>
              <p>{notice.author} | {moment(notice.createdAt).format('YYYY-MM-DD hh:mm')}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
