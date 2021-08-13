import { faArrowRight, faCheckCircle, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Topbar from '../../components/Topbar'
import Head from '../../components/Head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import useSWR from 'swr'
import xss from 'xss'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NoticesPage () {
  const [errorr, setError] = useState('')
  const router = useRouter()
  const { data, error } = useSWR('/api/lists?id=' + router.query.id, fetcher)
  if (!data) return <div className="w-screen"><Topbar /><div>로딩중...</div></div>
  if (error) return <div className="w-screen"><Topbar /><div>오류: {error}</div></div>
  if (!data.success) return <div className="w-screen"><Topbar /><div>오류: {data.message}</div></div>

  const { id, title, content, author, createdAt, author_id: authorid, tag, reason, status } = data.posts

  async function DeletePost () {
    if (!confirm('정말 삭제하시겠습니까?\n삭제한 글은 되둘릴 수 없습니다!')) return
    const res = await fetch('/api/lists', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then((res) => res.json())
    if (!res.success) {
      setError(res.message)
      return
    }
    alert('삭제되었습니다.')
    router.push('/')
  }

  return (
    <div className="w-screen">
      <Head subtitle={`${title} (#${id})`}/>
      <Topbar />
      <div className="text-center pt-10">
        <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2">3C인증서 제출</h1>
      </div>
      {errorr
        ? <div className="text-center m-3"><span className="text-red-500 px-5 py-3 bg-red-50 inline-block rounded-lg">{errorr}</span></div>
        : <></>}
      <div className="flex justify-center mt-10">
        <div className="w-full container xl:px-64 md:px-32">
          <div className="flex gap-3 border-b-2 pb-3">
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <p className="mt-1 font-thin">{author}({authorid}) 학생 | {tag} | 상태: {status === 2 ? '승인됨' : status === 1 ? '거절됨' : '대기중'} | {moment(createdAt).format('YYYY-MM-DD hh:mm')} | ID: {id}</p>

          <div className="my-10" dangerouslySetInnerHTML={{ __html: xss(content) }} />
          { status === 2 || status === 1
            ? <div>
                <hr />
                <h1 className="text-2xl mt-3">{status === 2 ? '승인' : status === 1 ? '거절' : '대기'} 사유</h1>
                <div className="my-5" dangerouslySetInnerHTML={{ __html: xss(reason) }} />
              </div>
            : <> </>}
          <hr />
          <div className="mt-6 flex gap-3">
            <Link href="/list" passHref><span className="text-gray-400 border-2 hover:border-0 hover:bg-gray-400 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faArrowRight} /> 돌아가기</span></Link>

            <div className="border-l-2 pl-3 flex gap-3">
              <span onClick={DeletePost} className="text-white bg-red-400 hover:bg-red-500 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faTrashAlt} /> 삭제</span>
              <Link href={'/post/edit?id=' + id} passHref><span className="text-white bg-blue-400 hover:bg-blue-500 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faPen} /> 수정</span></Link>
            </div>

            <div className="border-l-2 pl-3 flex gap-3">
              <Link href={'/post/status?id=' + id} passHref><span className="text-white bg-green-400 hover:bg-green-500 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faCheckCircle} /> 승인/거절</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
