import 'suneditor/dist/css/suneditor.min.css'
import Topbar from '../components/Topbar'
import dynamic from 'next/dynamic'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
})

export default function Home () {
  return (
    <div className="w-screen">
      <Topbar />
      <div className="flex flex-col w-full align-top p-10 text-4xl font-bold justify-center">
        <h1 className="text-center">공지사항 작성</h1>
        <div className="max-w-screen-lg mt-5">
          <SunEditor height="400"/>
        </div>
      </div>
    </div>
  )
}
