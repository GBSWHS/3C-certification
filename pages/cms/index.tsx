import useSWR from 'swr'
import Link from 'next/link'
import Header from '../../components/Nav'
import Container from '../../components/Container'
import router from 'next/router'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Index () {
  const { data, error } = useSWR('/api/@me', fetcher)
  if (error) return <div>error</div>
  if (!data) return <div>loading...</div>
  if (!data.success) router.push('/login')
  if (!data.user.user_type) router.push('/')

  return (
    <div>
      <Header title={'관리자 메뉴'} />
      <Container>
        <div className="w-full items-center justify-center">
          <div className='w-full text-center'>
            <div className="inline-flex mb-3 justify-between w-11/12 sm:W-8/12 items-end">
              <div className='inline-flex items-end'>
                <h1 className="font-bold text-2xl mr-1">정영훈</h1>
                <p>교사</p>
              </div>
              <span className="font-bold">{data.user_name}</span>
            </div>
            <Link passHref href="/cms/adduser"><button className='w-11/12 sm:W-8/12 p-3 font-bold bg-accent1 text-white hover:bg-blue-400 rounded-lg text-xl'>사용자 등록</button></Link>
            <Link passHref href="/cms/addgroup"><button className='w-11/12 sm:W-8/12 p-3 font-bold bg-accent1 text-white hover:bg-blue-400 rounded-lg text-xl mt-6'>그룹 등록</button></Link>
            <Link passHref href="/score/request"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-800 rounded-lg text-xl mt-6'>권한 설정</button></Link>
            <Link passHref href="/score/request"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-800 rounded-lg text-xl mt-6'>3C 영역 관리</button></Link>
            <Link passHref href="/score/request"><button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-800 rounded-lg text-xl mt-6'>통계 관리</button></Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
