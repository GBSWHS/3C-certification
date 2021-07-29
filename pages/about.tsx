import Topbar from '../components/Topbar'
import Head from '../components/Head'
import Image from 'next/image'

export default function About () {
  return (
    <div className="w-screen">
      <Head subtitle="공지사항" />
      <Topbar />
      <div className="flex justify-center">
        <div className="inline-block w-full align-top p-10 container">
          <div className="text-center">
            <h1 className="text-center text-4xl font-bold border-b-2 inline-block p-2"> 3C 인증제란?</h1>

            <div>
              <Image src="/3ccert.png" width="600px" height="600px" alt="3C 인증제란?" />
              <div>
                <b>3C 인증제</b>는 미래사회를 이끌어 나갈 SW직업인 양성을 위한 3C 핵심가치와 6대 핵심 역량을 길러주기 위해 제작되었습니다.
                (작성중...)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
