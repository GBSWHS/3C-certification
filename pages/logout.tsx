import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Head from '../components/Head'
import Topbar from '../components/Topbar'

export default function Home () {
  function logout () {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    alert('성공적으로 로그아웃했습니다.')
    window.location.href = '/'
  }

  return (
    <div className="w-screen">
      <Head subtitle="로그아웃" />
      <Topbar />
      <div className="inline-block text-center w-full align-top p-10">
        <div className="text-center">
          <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2"><FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃</h1>
        </div>

        <div className="border-2 inline-block p-10 mt-10">
          <b>정말 로그아웃 하시겠습니까?</b>
          <div className="flex gap-3 pt-5">
            <button className="text-white bg-red-400 hover:bg-red-500 hover:text-white py-2 px-5 font-bold cursor-pointer" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃</button>
            <Link href="/" passHref><span className="text-gray-400 border-2 hover:border-0 hover:bg-gray-400 hover:text-white py-2 px-5 font-bold cursor-pointer">돌아가기</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
