import useSWR from 'swr'
import Link from 'next/link'
import router from 'next/router'
import Header from '../components/Nav'
import Container from '../components/Container'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Index () {
  const { data, error } = useSWR('/api/@me', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (!data.success) router.push('/login')

  return (
    <div>
      <Header title={'내 정보'} />
      <Container>
        <div className="w-full items-center justify-center">
          <div className='w-full text-center'>
            <div className="inline-flex mb-3 justify-between w-11/12 sm:W-8/12 items-end">
              <div className='inline-flex items-end'>
                <h1 className="font-bold text-2xl mr-1">{data?.user?.user_name}</h1>
                <p>{data?.user?.user_type ? '교사' : '학생'}</p>
              </div>
            </div>
            <div className={ data?.user?.user_type ? 'hidden' : ''}>
              <Link passHref href="/score"><button className='w-11/12 sm:W-8/12 p-3 bg-accent1 hover:bg-blue-400 text-white font-semibold rounded-lg text-xl'>점수 확인</button></Link>
              <Link passHref href="/score/request"><button className='w-11/12 sm:W-8/12 p-3 bg-accent1 hover:bg-blue-400 text-white font-semibold rounded-lg text-xl mt-6'>점수 요청</button></Link>
            </div>
            <div className={ data?.user?.user_type ? '' : 'hidden'}>
              <Link passHref href="/cms/lookup"><button className='w-11/12 sm:W-8/12 p-3 font-bold bg-accent1 text-white hover:bg-blue-400 rounded-lg text-xl'>점수 확인</button></Link>
              <Link passHref href="/cms/regist"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-400 rounded-lg text-xl mt-6'>점수 등록</button></Link>
              <Link passHref href="/cms/approval"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-400 rounded-lg text-xl mt-6'>점수 승인</button></Link>
              <Link passHref href="/cms"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-400 rounded-lg text-xl mt-6'>관리자 메뉴</button></Link>
            </div>
            <Link passHref href="/api/logout"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-red-400 rounded-lg text-xl mt-6'>로그아웃</button></Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
