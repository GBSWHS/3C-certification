import dynamic from 'next/dynamic'
import Topbar from '../../components/Topbar'
import Link from 'next/link'
import 'suneditor/dist/css/suneditor.min.css'
import useSWR from 'swr'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from '../../components/Head'
import { faArrowRight, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SetOptions from 'suneditor-react/dist/types/SetOptions'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
})

const statusList = ['승인', '거절']

const sunEditorOptions: SetOptions = {
  buttonList: [
    ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
    ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print']
  ],
  placeholder: '이곳을 눌러 작성을 시작하세요'
}

export default function NoticeEdit () {
  const router = useRouter()
  const [errorr, setError] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState('')

  const id = router.query.id
  const { data, error } = useSWR('/api/lists?id=' + id, fetcher)
  if (!data) return <div>로딩중...</div>
  if (error) return <div>오류: {error}</div>
  if (!data.success) return <div>게시글을 찾을 수 없음</div>

  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    if (!status) return alert('승인/거절 여부를 선택해주세요')
    if (reason.length < 10) return alert('내용은 10자 이상이여야 합니다.')

    const res = await fetch('/api/lists', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason, status: status === '승인' ? 2 : 1, id
      })
    }).then((res) => res.json())

    if (!res.success) {
      setError(res.message)
      return
    }

    alert(`성공적으로 해당 게시글을 ${status}처리 하였습니다.`)
    router.push('/post/' + id)
  }

  return (
    <div className="w-screen">
      <Head subtitle="3C인증서 승인/거절" />
      <Topbar />
      <div className="inline-block w-full align-top p-10">
        <div className="text-center">
          <h1 className="text-center text-4xl border-b-2 font-bold inline-block cursor-default p-2"><FontAwesomeIcon icon={faPenAlt}/> 3C인증서 승인/거절 사유작성</h1>
        </div>

        {errorr
          ? <div className="text-center m-3"><span className="text-red-500 px-5 py-3 bg-red-50 inline-block rounded-lg">{errorr}</span></div>
          : <></>}

        <div className="flex justify-center">
          <form onSubmit={onSubmit} className="mt-5 container">
            <SunEditor setOptions={sunEditorOptions} setDefaultStyle="font-family: 'Noto Sans CJK KR'; font-weight: 400;" placeholder="이곳을 눌러 수정을 시작하세요" onChange={(v) => setReason(v)} height='400px' lang="ko"/>
            <div className="flex gap-3 flex-wrap mt-3">
              <select className="text-white bg-green-400 hover:bg-green-500 hover:text-white py-2 px-5 font-bold cursor-pointer">
                <option defaultChecked>상태를 선택해주세요</option>
                { statusList.map((m, i) => <option key={i} onClick={() => setStatus(m)}>{m}</option>)}
              </select>
              <button type="submit" className="text-white bg-blue-400 hover:bg-blue-500 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faPenAlt}/> 제출</button>
              <Link href="/" passHref><span className="text-gray-400 border-2 hover:border-0 hover:bg-gray-400 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faArrowRight} /> 돌아가기</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
