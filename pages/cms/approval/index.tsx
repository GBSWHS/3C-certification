import Link from 'next/link'
import Header from '../../../components/Nav'
import Container from '../../../components/Container'

export default function Regist () {
  return (
    <div>
      <Header title={'학생 조회'} />
      <Container>
        <span className="text-xl text-bold mb-1">1학년 1반</span>
        <table className="table w-full table-fixed border-collapse border border-black text-center overflow-y-scroll">
          <thead>
            <tr>
              <th className="border w-12 h-10 border-black">순</th>
              <th className="border h-10 border-black">이름</th>
              <th className="border h-10 border-black">영역</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border h-10 border-black">1</td>
              <td className="border h-10 border-black">임재현</td>
              <td className="border h-10 border-black">전공관련 국가기술자격 취득</td>
            </tr>
            <Link href={'/cms/approval/1116'} passHref>
              <tr>
                <td className="border h-10 border-black">2</td>
                <td className="border h-10 border-black">임태현</td>
                <td className="border h-10 border-black">전공관련 국가기술자격 취득</td>
              </tr>
            </Link>
            <tr>
              <td className="border h-10 border-black">3</td>
              <td className="border h-10 border-black">조수빈</td>
              <td className="border h-10 border-black">전공관련 국가기술자격 취득</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </div>
  )
}
