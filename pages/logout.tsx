import Link from 'next/link'
import Topbar from '../components/Topbar'

export default function Home () {
  function logout () {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    alert('성공적으로 로그아웃했습니다.')
    window.location.href = '/'
  }

  return (
    <div className="w-screen">
      <Topbar />
      <div className="inline-block text-center w-full align-top p-10">
        <h1 className="text-4xl font-bold">로그아웃</h1>

        <div className="border-2 inline-block p-10 mt-10">
          <b>정말 로그아웃 하시겠습니까?</b>
          <div className="flex gap-3">
            <button className="block mt-3 w-full bg-red-500 rounded text-white p-3" onClick={logout}>로그아웃</button>
            <Link href="/" passHref><button className="block mt-3 w-full bg-gray-400 text-white rounded p-3" >돌아가기</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
