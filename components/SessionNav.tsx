import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function SessionNav () {
  const { data, error } = useSWR('/api/ident', fetcher)

  if (!data) return <div className="rounded-md self-center font-bold cursor-pointer ml-5 p-3">로딩중...</div>
  if (error || !data.success) return <a className="rounded-md self-center font-bold cursor-pointer ml-5 p-3 hover:underline" href={process.env.NEXT_PUBLIC_OAUTH_URI}><FontAwesomeIcon icon={faSignInAlt} />  로그인</a>

  return (
    <div className="rounded-md self-center ml-5 p-3 flex gap-3">
      <div>
        <b>{data.name}</b> {data.type ? '선생' : '학생'}님
      </div>
      <span className="hover:underline border-l-2 pl-3"><Link href="/logout" passHref><span><FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃</span></Link></span>
    </div>
  )
}
