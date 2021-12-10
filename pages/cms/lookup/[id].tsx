import useSWR from 'swr'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Header from '../../../components/Nav'
import Container from '../../../components/Container'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Score () {
  const router = useRouter()
  const id = router.query.id as string

  const { data, error } = useSWR('/api/cms/lookup?id=' + id, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (!data.success) toast.error(data.error)
  console.log(data)
  return (
    <div>
      <Header title={id + ' 점수 확인'} />
      <Container>
        <div>
          <table className="table w-full table-fixed border-collapse border border-black text-center overflow-y-scroll">
            <thead>
              <tr>
                <th className="border h-10 border-black">핵심역량</th>
                <th className="border h-10 border-black">인증내용</th>
                <th className="border h-10 border-black">획득점수</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item: any) => (
                <tr key={item.verify_id}>
                  <td className="border h-10 border-black">{item.item_gn}</td>
                  <td className="border h-10 border-black">{item.item_name}</td>
                  <td className="border h-10 border-black">{item.item_point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
