import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function SessionNav () {
  const { data, error } = useSWR('/api/ident', fetcher)

  if (!data) return <div className="rounded-md self-center font-bold cursor-pointer ml-5 p-3">로딩중...</div>
  if (error || !data.success) return <a className="rounded-md self-center font-bold cursor-pointer ml-5 p-3" href={process.env.NEXT_PUBLIC_OAUTH_URI}>로그인</a>

  return (
    <div className="rounded-md self-center font-bold cursor-pointer ml-5 p-3">
      <b>{data.name} {data.type ? '선생' : '학생'}</b>님 | <Link href="/logout">로그아웃</Link>
    </div>
  )
}
