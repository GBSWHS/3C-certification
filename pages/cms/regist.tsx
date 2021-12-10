import Link from 'next/link'
import Header from '../../components/Nav'
import Container from '../../components/Container'

export default function Regist () {
  return (
    <div>
      <Header title={'점수 등록'} />
      <Container>
      <div className="mt-32 w-full items-center justify-center">
          <form className='mb-32 w-full text-center sm:px-28 px-0'>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>학생명:</label>
              <select className='h-10 w-10/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg'>
                <option>임태현</option>
                <option>조수빈</option>
              </select>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>항목:</label>
              <select className='h-10 w-10/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg'>
                <option>문화역량</option>
                <option>기타</option>
              </select>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>기준일:</label>
              <input className='h-10 w-10/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' type='date' />
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>점수:</label>
              <input className='h-10 w-10/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' type='number' />
            </div>
            <div className="inline-flex w-full gap-3">
              <button className="bg-accent1 text-white p-3 w-8/12 rounded-lg" type="submit">점수 부여</button>
              <Link href="/" passHref><button className="bg-accent1 text-white p-3 w-8/12 rounded-lg">취소</button></Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
