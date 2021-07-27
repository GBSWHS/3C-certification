import Topbar from '../components/Topbar'

export default function Home () {
  function logout () {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    window.location.href = '/'
  }

  return (
    <div className="w-screen">
      <Topbar />
      <div className="inline-block w-full align-top p-10 text-4xl font-bold">
        <h1 className="text-center">로그아웃</h1>

        <p>로그아웃 하시겠습니까?</p>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  )
}
