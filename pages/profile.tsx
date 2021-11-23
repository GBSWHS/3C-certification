import Topbar from '../components/Topbar'
import Head from '../components/Head'
import moment from 'moment'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function About () {
  const { data, error } = useSWR('/api/ident', fetcher)

  if (!data) return <div className="rounded-md self-center font-bold cursor-pointer ml-5 p-3">로딩중...</div>

  return (
    <div className="w-screen">
      <Head subtitle="내 정보" />
      <Topbar />
      <div className="flex justify-center">
        <div className="inline-block w-full align-top p-10 container">
          <div className="text-center">
            <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2">{data.name}{data.type ? '선생' : '학생'}님의 정보</h1>
          </div>
          { !data.success || error
            ? <span>오류: 로그인이 필요합니다.</span>
            : data.type
              ? <span>열람 권한이 없습니다</span>
              : <div>
              <p>{data.grade}학년 {data.class}반 {data.class_number}번 {data.name}학생의 3C인증 정보 조회</p>
              <table className="table-fixed w-full mt-5 border-2 border-gray-200 text-center">
                <thead className="border-b-2">
                  <tr>
                    <th className="w-1/12 py-3">ID</th>
                    <th className="w-1/2">제목</th>
                    <th className="w-1/6">현재 상태</th>
                    <th className="w-1/5">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  { data.posts.map((m: any, i: number) => (
                    <tr className="border-b-2" key={i}>
                      <td className="py-2">{m.id}</td>
                      <td className="text-blue-600"><Link href={'/post/' + m.id} passHref>{m.title}</Link></td>
                      <td>{m.status === 2 ? '거절됨' : m.status === 1 ? '승인됨' : '대기중'}</td>
                      <td>{moment(m.createdAt).format('YYYY-MM-DD hh:mm')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
