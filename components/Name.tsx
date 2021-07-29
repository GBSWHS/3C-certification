import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function Name () {
  const router = useRouter()
  const { data, error } = useSWR('/api/ident', fetcher)

  if (!data) return <div className="rounded-md self-center font-bold cursor-pointer ml-5 p-3">로딩중...</div>
  if (error || !data.success) return router.push('/')

  return (
    <span><b>{data.name}</b> {data.type ? '선생' : '학생'}</span>
  )
}
