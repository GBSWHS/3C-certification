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
    <div>
      {data.notices.map((notice: NoticeData, i: number) => (
        <div key={i}>
          <h3>{notice.title}</h3>
          <p>{notice.author} | {notice.createdAt}</p>
        </div>
      ))}
    </div>
  )
}
