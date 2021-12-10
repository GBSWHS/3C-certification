import Link from 'next/link'
import Header from '../../components/Nav'
import Container from '../../components/Container'

export default function Request () {
  return (
    <div>
      <Header title={'점수 요청'} />
      <Container>
        <div className="mt-32 w-full items-center justify-center">
          <form className='mb-32 w-full text-center sm:px-28 px-0'>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>항목:</label>
              <select className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg'>
                <option>선택</option>
                <option>선택</option>
              </select>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>기준일:</label>
              <input className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' type='date' />
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>파일:</label>
              <input className="w-8/12" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
            </div>
            <div className="inline-flex w-full gap-3">
              <button className="bg-accent1 text-white p-3 w-8/12 rounded-lg">승인 요청</button>
              <Link href="/" passHref><button className="bg-accent1 text-white p-3 w-8/12 rounded-lg">취소</button></Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
