import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function SessionNav () {
  const { data, error } = useSWR('/api/ident', fetcher)

  if (!data) return <div>로딩중...</div>
  if (error || !data.success) return <a href={process.env.NEXT_PUBLIC_OAUTH_URI}>로그인</a>

  return (
    <div>
      <b>{data.name} {data.type ? '선생' : '학생'}</b>님 | <Link href="/logout">로그아웃</Link>
    </div>
  )
}
