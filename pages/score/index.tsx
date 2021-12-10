import useSWR from 'swr'
import Header from '../../components/Nav'
import Container from '../../components/Container'
import toast from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Score () {
  const { data, error } = useSWR('/api/me/lookup', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (!data.success) toast.error(data.error)

  return (
    <div>
      <Header title={'점수 확인'} />
      <Container>
        <div>
          <div className="flex justify-between items-end">
            <span className="text-semibold">내 정보</span>
            <span className="text-xl text-bold">9레벨</span>
          </div>
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
                  <th className="border h-10 border-black">{item.item_gn}</th>
                  <th className="border h-10 border-black">{item.item_name}</th>
                  <th className="border h-10 border-black">{item.item_point}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
