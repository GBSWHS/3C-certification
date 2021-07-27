import Topbar from '../components/Topbar'
import Notices from '../components/Notices'

export default function Home () {
  return (
    <div className="w-screen">
      <Topbar />
      <div className="inline-block w-full align-top p-10 text-4xl font-bold">
        <h1 className="text-center">공지사항</h1>

        <Notices />
      </div>
    </div>
  )
}
