import dynamic from 'next/dynamic'
import Topbar from '../../components/Topbar'
import Link from 'next/link'
import 'suneditor/dist/css/suneditor.min.css'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from '../../components/Head'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
})

const sunEditorOptions = {
  buttonList: [
    ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
    ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print']
  ]
}

export default function NoticeEdit () {
  const router = useRouter()

  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [memberOnly, setMemberOnly] = useState(true)

  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    if (title.length < 5) return alert('제목은 5자 이상이여야 합니다.')
    if (content.length < 10) return alert('내용은 10자 이상이여야 합니다.')

    const res = await fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, content, memberOnly
      })
    }).then((res) => res.json())

    if (!res.success) {
      setError(res.message)
      return
    }

    alert('성공적으로 글이 작성되었습니다.')
    router.push('/notice/' + res.id)
  }

  return (
    <div className="w-screen">
      <Head subtitle="공지사항 작성" />
      <Topbar />
      <div className="inline-block w-full align-top p-10">
        <h1 className="text-center text-4xl font-bold cursor-default">공지사항 작성</h1>

        {error
          ? <div className="text-center m-3"><span className="text-red-500 px-5 py-3 bg-red-50 inline-block rounded-lg">{error}</span></div>
          : <></>}

        <div className="flex justify-center">
          <form onSubmit={onSubmit} className="mt-5 container">
            <input autoFocus type="text" className="mb-3 w-full border-2 p-3 focus:border-blue-300" maxLength={30} onChange={(ev) => setTitle(ev.target.value)} placeholder="제목을 입력하세요"/>
            <SunEditor setOptions={sunEditorOptions} setDefaultStyle="font-family: 'Noto Sans CJK KR'; font-weight: 400;" placeholder="이곳을 눌러 작성을 시작하세요" onChange={(v) => setContent(v)} height='400px' lang="ko"/>
            <div className="flex gap-3 flex-wrap mt-3">
              <label className="bg-gray-100 py-3 px-5 font-bold max-w-max cursor-pointer" htmlFor="memberOnly">
                <input checked={memberOnly} className="mr-2" type="checkbox" id="memberOnly" onChange={(ev) => setMemberOnly(ev.target.checked)}/>
                <span className="select-none">학생만 볼 수 있음</span>
              </label>
              <button type="submit" className="text-white bg-blue-400 hover:bg-blue-500 hover:text-white py-2 px-5 font-bold cursor-pointer">게시</button>
              <Link href="/" passHref><span className="text-gray-400 border-2 hover:border-0 hover:bg-gray-400 hover:text-white py-2 px-5 font-bold cursor-pointer">돌아가기</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
