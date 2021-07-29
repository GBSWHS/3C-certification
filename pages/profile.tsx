import Topbar from '../components/Topbar'
import Name from '../components/Name'
import Head from '../components/Head'
import Image from 'next/image'

export default function About () {
  return (
    <div className="w-screen">
      <Head subtitle="내 정보" />
      <Topbar />
      <div className="flex justify-center">
        <div className="inline-block w-full align-top p-10 container">
          <div className="text-center">
            <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2"> <Name />님의 정보</h1>

            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
