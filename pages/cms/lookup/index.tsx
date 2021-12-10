import useSWR from 'swr'
import Link from 'next/link'
import Header from '../../../components/Nav'
import Container from '../../../components/Container'
import toast from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Lookup () {
  const { data, error } = useSWR('/api/cms/lookup', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (!data.success) toast.error(data.error)

  return (
    <div>
      <Header title={'학생 조회'} />
      <Container>
        <span className="text-xl text-bold mb-1">1학년 1반</span>
        <table className="table w-full table-fixed border-collapse border border-black text-center overflow-y-scroll">
          <thead>
            <tr>
              <th className="border h-10 border-black">아이디</th>
              <th className="border w-20 h-10 border-black">이름</th>
              <th className="border h-10 border-black">점수</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item: any) => (
              <Link href={'/cms/lookup/' + item.user_id} key={item.user_id} passHref>
                <tr>
                  <td className="border h-10 border-black">{item.user_id}</td>
                  <td className="border h-10 border-black">{item.user_name}</td>
                  <td className="border h-10 border-black">{item.points}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  )
}

// 'w-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-800 rounded-lg text-xl mt-6'
